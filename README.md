# Sistema de Agendamentos

Aplicação web para gerenciamento de serviços e agendamentos, desenvolvida com Node.js, Express, EJS e MySQL.

O sistema permite que clientes consultem serviços disponíveis e realizem agendamentos, enquanto funcionários e administradores possuem diferentes níveis de acesso para gerenciamento dos serviços e da agenda.

## Funcionalidades

### Clientes

- Visualização dos serviços disponíveis
- Visualização dos horários disponíveis
- Criação de agendamentos
- Cancelamento de agendamentos
- Cadastro de informações do cliente durante o agendamento

### Funcionários

- Autenticação no sistema
- Visualização dos próprios serviços
- Visualização da própria agenda
- Gerenciamento de informações relacionadas aos seus serviços
- Controle de acesso baseado no funcionário responsável pelo serviço

### Administradores

- Gerenciamento de funcionários
- Gerenciamento de serviços
- Gerenciamento de agendamentos
- Controle geral do sistema

## 🛠️ Tecnologias

- Node.js
- Express
- EJS
- MySQL
- JavaScript
- HTML5
- CSS3
- Express Session
- Socket.IO

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura organizada em camadas, separando responsabilidades entre rotas, controllers, services e acesso aos dados.

```text
Requisição
    ↓
Routes
    ↓
Middlewares
    ↓
Controllers
    ↓
Services
    ↓
MySQL
