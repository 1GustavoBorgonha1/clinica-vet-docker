# 🐾 Sistema de Clínica Veterinária (Dockerizado)

Sistema web para gestão e agendamento de consultas de uma clínica veterinária, desenvolvido como projeto acadêmico utilizando containers com **Docker** e **Docker Compose**.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 e JavaScript (Vanilla)
- **Backend:** Node.js com Express
- **Banco de Dados:** PostgreSQL 13
- **Infraestrutura:** Docker e Docker Compose

---

## ⚙️ Arquitetura do Projeto

O sistema é dividido em dois serviços principais:

### 🖥️ Aplicação Web (`app_clinica`)
Container responsável pela aplicação Node.js e interface do sistema.

### 🗄️ Banco de Dados (`db_clinica`)
Container PostgreSQL com volume persistente (`db_data`) para armazenamento seguro dos dados da clínica.

Os containers se comunicam através de uma rede Docker interna chamada:

```bash
rede_clinica
```

---

## 📂 Estrutura do Projeto

```bash
clinica-vet-docker/
│
├── app/
│   ├── public/
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 🛠️ Como executar o projeto localmente

### ✅ Pré-requisitos

Antes de começar, instale:

- Docker
- Docker Compose

---

### 📥 Clone o repositório

```bash
git clone https://github.com/1GustavoBorgonha1/clinica-vet-docker.git
```

---

### 📁 Acesse a pasta do projeto

```bash
cd clinica-vet-docker
```

---

### ▶️ Execute os containers

```bash
docker compose up -d
```

---

### 🌐 Acesse a aplicação

Abra no navegador:

```bash
http://localhost:3000
```

---

## 🛑 Como parar a aplicação

Para parar os containers sem apagar os dados do banco:

```bash
docker compose down
```

---

## 💾 Persistência de Dados

O PostgreSQL utiliza um volume Docker persistente chamado:

```bash
db_data
```

Isso garante que os dados não sejam perdidos mesmo após reiniciar os containers.

---

## 📸 Funcionalidades do Sistema

- Cadastro de pets
- Cadastro de veterinários
- Agendamento de consultas
- Gerenciamento de registros
- Persistência de dados com PostgreSQL
- Ambiente totalmente dockerizado

---

## 📚 Objetivo Acadêmico

Este projeto foi desenvolvido com foco em:

- Conteinerização de aplicações
- Orquestração com Docker Compose
- Integração entre backend e banco de dados
- Persistência de dados
- Organização de infraestrutura em ambientes isolados

---

## 🐳 Imagem Pública no DockerHub

A imagem Docker da aplicação foi publicada no DockerHub e pode ser acessada pelo link abaixo:

🔗 https://hub.docker.com/r/gustavoborgonha/clinica-vet-app

### 📥 Baixar a imagem manualmente

```bash
docker pull gustavoborgonha/clinica-vet-app

---

## 👨‍💻 Autor

Desenvolvido por **Gustavo Borgonha**

### 🔗 Repositório do Projeto

https://github.com/1GustavoBorgonha1/clinica-vet-docker
