const express = require('express');
const { Pool } = require('pg');
const path = require('path'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); 

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'clinica_vet'
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'Conectado ao Banco de Dados!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao conectar no banco', details: err.message });
  }
});

// --- Rotas para Veterinários ---
app.post('/veterinarios', async (req, res) => {
  const { nome, crmv } = req.body;
  try {
    const result = await pool.query('INSERT INTO veterinarios (nome, crmv) VALUES ($1, $2) RETURNING *', [nome, crmv]);
    res.status(201).json(result.rows[0]);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
});

app.get('/veterinarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM veterinarios ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Rotas para Pets ---
app.get('/pets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pets ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/pets', async (req, res) => {
  const { nome, especie, dono } = req.body;
  try {
    const query = 'INSERT INTO pets (nome, especie, dono) VALUES ($1, $2, $3) RETURNING *';
    const values = [nome, especie, dono];
    const result = await pool.query(query, values);
    res.status(201).json({
      message: 'Pet cadastrado com sucesso!',
      pet: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Rotas para Consultas ---
app.get('/consultas', async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id, 
        c.data_hora, 
        c.diagnostico, 
        c.status,
        p.nome as pet_nome, 
        v.nome as vet_nome
      FROM consultas c
      INNER JOIN pets p ON c.id_pet = p.id
      INNER JOIN veterinarios v ON c.id_veterinario = v.id
      WHERE c.status != 0 -- Ignora canceladas conforme a regra de negócio
      ORDER BY c.data_hora DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/consultas', async (req, res) => {
  const { data_hora, id_pet, id_veterinario, diagnostico } = req.body;
  try {
    const query = `
      INSERT INTO consultas (data_hora, id_pet, id_veterinario, diagnostico) 
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const result = await pool.query(query, [data_hora, id_pet, id_veterinario, diagnostico]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Rota para o Dashboard ---
app.get('/dashboard-stats', async (req, res) => {
  try {
    // 1. Consultas do dia
    const consultasHoje = await pool.query(`
      SELECT COUNT(*) FROM consultas 
      WHERE DATE(data_hora) = CURRENT_DATE AND status != 0
    `);

    // 2. Pets mais atendidos
    const petsPopulares = await pool.query(`
      SELECT p.nome, COUNT(c.id) as total 
      FROM consultas c 
      JOIN pets p ON c.id_pet = p.id 
      GROUP BY p.nome 
      ORDER BY total DESC 
      LIMIT 3
    `);

    res.json({
      hoje: consultasHoje.rows[0].count,
      ranking: petsPopulares.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor da Clínica Vet rodando na porta ${port}`);
});