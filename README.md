# Sistema de Agendamentos

Aplicação web para **gerenciar serviços e agendamentos**, em que empresas ou pessoas físicas cadastram seus serviços, atribuem funcionários e definem os horários disponíveis, e os clientes agendam de forma simples, informando seus dados.

> **Status:** em desenvolvimento.




---

## Funcionalidades

### Clientes
- Consultar serviços e horários disponíveis
- Criar e cancelar agendamentos
- Informar nome, e-mail e telefone no momento do agendamento

### Funcionários
- Autenticar-se no sistema
- Visualizar seus próprios serviços e sua agenda
- Gerenciar as informações dos serviços sob sua responsabilidade

### Administradores
- Gerenciar funcionários, serviços e agendamentos
- Controle geral do sistema

---

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Back-end | Node.js, Express, Express Session, Socket.IO |
| Front-end | EJS, HTML5, CSS3, JavaScript |
| Banco de dados | MySQL |

---

## Arquitetura

O projeto segue uma arquitetura em camadas, que separa as responsabilidades e facilita a manutenção:

```
Routes → Middlewares → Controllers → Services → MySQL
```

- **Routes:** definem os endpoints da aplicação
- **Middlewares:** autenticação e controle de acesso por perfil
- **Controllers:** recebem a requisição e retornam a resposta
- **Services:** regras de negócio e acesso ao banco
- **Views / partials:** páginas renderizadas com EJS

### Estrutura de pastas

```
├── controllers/
├── data/
├── middlewares/
├── partials/
├── public/
├── routes/
├── services/
├── views/
└── index.js
```

---

## Como executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- MySQL instalado e em execução

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/jvalentem/Sistema-de-agendamentos.git
   cd Sistema-de-agendamentos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o banco de dados no MySQL executando o script `data/schema.sql` (pelo terminal ou por uma ferramenta como o MySQL Workbench).

4. Crie o arquivo `data/.env` com os dados de conexão do seu MySQL:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_NAME=nome_do_banco
   DB_PORT=3306
   ```

5. Inicie a aplicação:
   ```bash
   node index.js
   ```

6. Acesse no navegador: `http://localhost:3000`

---

## Próximos passos

- [ ] Finalizar o painel do administrador
- [ ] Implementar criptografia de senhas com bcrypt
- [ ] Fortalecer a segurança da aplicação
- [ ] Publicação online (deploy)

---

## Autor

**João Victor Valente Meneses**
Estudante de Engenharia de Energias (IFBA) e técnico em Desenvolvimento de Sistemas

[GitHub](https://github.com/jvalentem) | [LinkedIn](https://linkedin.com/in/jvalentemeneses)
