-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE championsstats;

USE championsstats;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(50),
	senha VARCHAR(45)
);

create table jogador (
idJogador int primary key auto_increment,
nome varchar(45),
qtdVotos int,
posicao varchar(45)
);

create table resultadoVotacao (
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario),
fkJogador int,
foreign key (fkJogador) references jogador(idJogador)
);