CREATE DATABASE IF NOT EXISTS sistema_agendamentos;

USE sistema_agendamentos;

CREATE TABLE IF NOT EXISTS usuarios(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR (255) NOT NULL,
    acesso VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS servicos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    fk_funcionario INT NOT NULL,
    FOREIGN KEY(fk_funcionario) REFERENCES usuarios(id),
    preco DOUBLE NOT NULL,
    duracao INT NOT NULL
);

CREATE TABLE IF NOT EXISTS horarios(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    hora VARCHAR(255) NOT NULL,
    ocupado BOOLEAN NOT NULL DEFAULT false,
    fk_servico INT NOT NULL,
    FOREIGN KEY(fk_servico) REFERENCES servicos(id)
);

CREATE TABLE IF NOT EXISTS agendamentos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_cliente INT NOT NULL,
    fk_funcionario INT NOT NULL,
    fk_servico INT NOT NULL,
    fk_horario INT NOT NULL,
    hora VARCHAR(255) NOT NULL,
    aStatus VARCHAR(255) NOT NULL DEFAULT "Em andamento"
);