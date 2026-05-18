-- 1. Tabela de Veterinários
CREATE TABLE IF NOT EXISTS veterinarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    crmv VARCHAR(20) UNIQUE NOT NULL
);

-- 2. Tabela de Pets (Com o campo 'dono' em texto)
CREATE TABLE IF NOT EXISTS pets (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    dono VARCHAR(100) NOT NULL
);

-- 3. Tabela de Consultas (Ligando Pet e Veterinário)
CREATE TABLE IF NOT EXISTS consultas (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    diagnostico TEXT,
    status INTEGER DEFAULT 1,
    id_pet INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    id_veterinario INTEGER REFERENCES veterinarios(id) ON DELETE CASCADE
);

-- Dados iniciais para já aparecerem no formulário
INSERT INTO veterinarios (nome, crmv) VALUES ('Dr. Felipe', 'CRMV-SC 1234');
INSERT INTO pets (nome, especie, dono) VALUES ('Thor', 'Cachorro', 'Gustavo');