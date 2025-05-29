create database individual;

use individual;

create table Usuario (
    id_usuario int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    senha varchar(255) not null
);

create table Personagem (
    id_personagem int auto_increment primary key,
    nome varchar(100) not null,
    origem varchar(100),
    classe varchar(100),
    nivel int default 1,
    id_usuario int not null,
    id_campanha INT,
    foreign key (id_campanha) references Campanha(id_campanha),
    foreign key (id_usuario) references Usuario(id_usuario)
);

create table Campanha (
    id_campanha int auto_increment primary key,
    nome varchar(100) not null,
    sistema varchar(100) not null,
    descricao text,
    id_mestre int not null,
    foreign key (id_mestre) references Usuario(id_usuario)
);

-- Tabela de associação entre Campanha e Personagem
create table Campanha_Personagem (
    id_campanha int,
    id_personagem int unique,
    primary key (id_campanha, id_personagem),
    foreign key (id_campanha) references Campanha(id_campanha),
    foreign key (id_personagem) references Personagem(id_personagem)
);

-- Usuários
insert into Usuario (nome, email, senha) values
('Cogo', 'cogo@email.com', 'senha123'),
('Murillo', 'murillo@email.com', 'senha123'),
('Leon', 'leon@email.com', 'senha123');

-- Personagens
insert into Personagem (nome, origem, classe, nivel, id_usuario) values
-- D&D
('Theren', 'Elfo da Floresta', 'Patrulheiro', 4, 1),     -- Cogo
-- Cyberpunk
('Nyx', 'Night City', 'Netrunner', 3, 2),                -- Murillo
-- Call of Cthulhu
('Evelyn Moore', 'Boston', 'Investigadora Particular', 2, 3); -- Leon

-- Campanhas
insert into Campanha (nome, sistema, descricao, id_mestre) values
('A Floresta de Umbra', 'Dungeons & Dragons 5e', 'Uma floresta amaldiçoada guarda segredos antigos e perigos esquecidos.', 1),
('Redline Protocol', 'Cyberpunk RED', 'Missão clandestina para invadir uma megacorporação em Night City.', 2),
('Sombras sobre Arkham', 'Call of Cthulhu', 'Eventos paranormais atormentam a cidade de Arkham e ameaçam a sanidade dos envolvidos.', 3);

-- Associação Campanha x Personagem
insert into Campanha_Personagem (id_campanha, id_personagem) values
(1, 1), -- Theren na campanha D&D
(2, 2), -- Nyx na campanha Cyberpunk
(3, 3); -- Evelyn na campanha Cthulhu

