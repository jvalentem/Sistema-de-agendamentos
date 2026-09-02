CREATE DATABASE IF NOT EXISTS sistema_agendamentos;

USE sistema_agendamentos;

select * from agendamentos;

select * from servicos;


SELECT horarios.* FROM servicos JOIN horarios ON horarios.fk_servico = servicos.id where servicos.id = 2;

select * from horarios;

CREATE TABLE IF NOT EXISTS clientes(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR (255) NOT NULL,
    acesso VARCHAR(255) NOT NULL
);

INSERT INTO usuarios(nome,senha,acesso) VALUES ('Funcionario','123','funcionario');
INSERT INTO usuarios(nome,senha,acesso) VALUES ('Funcionario2','123','funcionario');

CREATE TABLE IF NOT EXISTS servicos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    fk_funcionario INT NOT NULL,
    FOREIGN KEY(fk_funcionario) REFERENCES usuarios(id),
    preco DOUBLE NOT NULL,
    duracao INT NOT NULL,
    ativo boolean not null default true
);

INSERT INTO servicos(nome,fk_funcionario,preco,duracao) VALUES ('Psicologia',1,45,60);
INSERT INTO servicos(nome,fk_funcionario,preco,duracao) VALUES ('Ed. Física',2,45,60);


CREATE TABLE IF NOT EXISTS horarios(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    hora VARCHAR(255) NOT NULL,
    ocupado BOOLEAN NOT NULL DEFAULT false,
    fk_servico INT NOT NULL,
    FOREIGN KEY(fk_servico) REFERENCES servicos(id)
);

INSERT INTO horarios(hora,fk_servico) VALUES ('15:00',1);
INSERT INTO horarios(hora,fk_servico) VALUES ('16:00',1);
INSERT INTO horarios(hora,fk_servico) VALUES ('17:00',2);
INSERT INTO horarios(hora,fk_servico) VALUES ('18:00',2);



CREATE TABLE IF NOT EXISTS agendamentos(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fk_cliente INT NOT NULL,
    fk_funcionario INT NOT NULL,
    fk_servico INT NOT NULL,
    fk_horario INT NOT NULL,
    hora VARCHAR(255) NOT NULL,
    aStatus VARCHAR(255) NOT NULL DEFAULT "Em andamento"
);