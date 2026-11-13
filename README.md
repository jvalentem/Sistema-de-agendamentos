# Sistema de Agendamentos

Aplicação web para **gerenciar serviços e agendamentos**, em que empresas ou pessoas físicas cadastram seus serviços, atribuem funcionários e definem os horários disponíveis, e os clientes agendam de forma simples, informando seus dados.

> **Status:** em desenvolvimento.

<h1>INTERFACE DO CLIENTE</h1>

<h2>SELEÇÃO DO SERVIÇO</h2>
<img width="1490" height="722" alt="image" src="https://github.com/user-attachments/assets/ab287d30-97a0-4c03-a221-ddd4b59509db" />
<br>
<h2>SELEÇÃO DE HORÁRIO</h2>
<img width="1532" height="533" alt="image" src="https://github.com/user-attachments/assets/d70b35cd-28d3-4b4c-b933-2f59418cf9b0" />
<h2>CADASTRO DO CLIENTE</h2>
<img width="1530" height="637" alt="image" src="https://github.com/user-attachments/assets/7e7ba744-75d3-445d-9fd9-8c7dcce5edb9" />

<h1>INTERFACE DO FUNCIONARIO</h1>

<h2>SERVIÇOS EM ANDAMENTO</h2>
<img width="1522" height="747" alt="image" src="https://github.com/user-attachments/assets/c141edc7-cb6d-4bdc-aa37-e19b61d09d18" />
<img width="1527" height="406" alt="image" src="https://github.com/user-attachments/assets/04761c50-4f05-4c5a-83b7-33bfd112e633" />

<h2>SERVIÇOS EM QUE O FUNCIONÁRIO TRABALHA</h2>
<img width="1522" height="600" alt="image" src="https://github.com/user-attachments/assets/4b0fe979-d1ec-44c6-ad62-b8d47a7c3a1b" />
<img width="1527" height="432" alt="image" src="https://github.com/user-attachments/assets/ad97cf8c-0b80-4f02-b0ac-09462c99ffe0" />


<h1>INTERFACE DO ADMINISTRADOR</h1>

<h2>VISÃO INICIAL</h2>
<img width="1502" height="623" alt="image" src="https://github.com/user-attachments/assets/8802f2e5-90e8-4e8b-8884-b52a8a1cd4e3" />

<h2>CONSULTA DE SERVIÇOS</h2>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6b4e6604-6bff-48c2-b1b3-72a863f83e9d" />

<h2>CONSULTA DE FUNCIONÁRIOS</h2>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6e6a600d-1aab-4f50-bf72-31bac94961a0" />

<h2>CONSULTA DE AGENDA DE FUNCIONÁRIO</h2>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/44ff8178-465a-4ccd-a069-42c1efb18864" />

<h2>CONSULTA DE TODOS OS AGENDAMENTOS</h2>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ce95239b-d654-4911-9ac7-a0aab08a2e4b" />

<h2>CONSULTA DE CLIENTES</h2>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5a065735-718f-4d46-a25e-a57424b9d486" />


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
