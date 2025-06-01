create database individual;
use individual;

create table Usuario (
    id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    senha varchar(255) not null
);

create table Sistema (
	id int primary key auto_increment,
	nome varchar(50),
	genero varchar(30)
);

create table Campanha (
    id int auto_increment primary key,
    nome varchar(100) not null,
	descricao text,
    fk_sistema int not null,
    fk_mestre int not null,
    foreign key (fk_mestre) references Usuario(id),
    foreign key (fk_sistema) references Sistema(id)
);

create table Personagem (
    id int auto_increment primary key,
    nome varchar(100) not null,
    origem varchar(100),
    classe varchar(100),
    nivel int default 1,
    fk_usuario int not null,
    foreign key (fk_usuario) references Usuario(id)
);

-- Tabela de associação entre Campanha e Personagem
create table Campanha_Personagem (
    fk_campanha int,
    fk_personagem int unique,
    primary key (fk_campanha, fk_personagem),
    foreign key (fk_campanha) references Campanha(id),
    foreign key (fk_personagem) references Personagem(id)
);

-- Usuários
insert into Usuario (nome, email, senha) values
('Cogo', 'cogo@email.com', 'senha123'),
('Murillo', 'murillo@email.com', 'senha123'),
('Leon', 'leon@email.com', 'senha123'),
('Laura', 'laura@email.com', 'senha123'),
('Marilia', 'marilia@email.com', 'senha123'),
('Isabelly', 'isabelly@email.com', 'senha123'),
('Bruno', 'bruno@email.com', 'senha123'),
('Danilo', 'danilo@email.com', 'senha123'),
('Kheyla', 'kheyla@email.com', 'senha123'),
('Vitor', 'vitor@email.com', 'senha123');

-- Sistemas
insert into Sistema (nome, genero) values
('Dungeons & Dragons 5e', 'Fantasia Medieval'),
('Call of Cthulhu', 'Terror Cósmico'),
('Cyberpunk RED', 'Cyberpunk'),
('Pathfinder 2e', 'Fantasia Medieval'),
('Feiticeiros e Maldições', 'Terror Fantasioso e Anime'),
('OP RPG', 'Piratas e Anime'),
('Ordem Paranormal', 'Terror e Investigação'),
('Tormenta 20', 'Fantasia Medieval'),
('Star Wars Saga', 'Sci-fi');

-- Personagens
insert into Personagem (nome, origem, classe, nivel, fk_usuario) values
('Theren', 'Elfo da Floresta', 'Patrulheiro', 4, 1),
('Nyx', 'Night City', 'Netrunner', 3, 2),
('Evelyn Moore', 'Boston', 'Fixer', 2, 3),
('Renato', 'Elfo', 'Guerreiro', 2, 1),
('Joana', 'Mercenário urbano', 'Solo', 1, 1),
('Rosco', 'Psicólogo', 'Psicólogo', 1, 2),
('Marcus', 'Meio-Orc', 'Ladino', 3, 2),
('Samira', 'Contrabandista', 'Fixer', 3, 2),
('Reflexo', 'Detetive', 'Detetive Particular', 1, 3),
('Krusk', 'Anão', 'Mago', 4, 3),
('Faelar', 'Engenheiro cibernético', 'Techie', 3, 3),
('Renata', 'Médico', 'Médico', 5, 3),
('Balin', 'Halfling', 'Patrulheiro', 1, 4),
('Helena', 'Técnico de rede', 'Netrunner', 1, 4),
('Beatriz', 'Professor', 'Professor Universitário', 2, 4),
('Shura', 'Humano', 'Clérigo', 1, 4),
('Chave', 'Médico de rua', 'Medtech', 1, 4),
('Vírus', 'Jornalista', 'Jornalista', 4, 5),
('Aelar', 'Elfo', 'Guerreiro', 2, 5),
('Lucian', 'Mercenário urbano', 'Solo', 4, 5),
('Poppy', 'Psicólogo', 'Psicólogo', 5, 5),
('Cubo', 'Meio-Orc', 'Ladino', 1, 5),
('Raio', 'Contrabandista', 'Fixer', 3, 6),
('Milo', 'Detetive', 'Detetive Particular', 2, 6),
('Thrain', 'Anão', 'Mago', 4, 6),
('Theren', 'Engenheiro cibernético', 'Techie', 4, 7),
('Urg', 'Médico', 'Médico', 1, 7),
('Grog', 'Halfling', 'Patrulheiro', 3, 7),
('Dworic', 'Técnico de rede', 'Netrunner', 5, 8),
('Nina', 'Professor', 'Professor Universitário', 5, 8),
('Naeris', 'Humano', 'Clérigo', 1, 8),
('Eduardo', 'Médico de rua', 'Medtech', 1, 8),
('Baern', 'Jornalista', 'Jornalista', 2, 9),
('Sylvar', 'Elfo', 'Guerreiro', 1, 9),
('Darak', 'Mercenário urbano', 'Solo', 2, 9),
('Kargrom', 'Psicólogo', 'Psicólogo', 2, 10),
('Kathleen', 'Meio-Orc', 'Ladino', 2, 10),
('David', 'Contrabandista', 'Fixer', 5, 10);

-- Campanhas
insert into Campanha (nome, descricao, fk_sistema, fk_mestre) values
('A Floresta de Umbra', 'Uma floresta amaldiçoada guarda segredos antigos e perigos esquecidos.', 1, 3),
('Redline Protocol', 'Missão clandestina para invadir uma megacorporação em Night City.', 3, 1),
('Sombras sobre Arkham', 'Eventos paranormais atormentam a cidade de Arkham e ameaçam a sanidade dos envolvidos.', 2, 2),
('As Minas de Kaldrun', 'Antigas minas escondem artefatos poderosos e perigos esquecidos.', 1, 1),
('Protocolos de Sangue', 'Hackers lutam contra corporações em um mundo sombrio e tecnológico.', 3, 1),
('Ecos de Carcosa', 'Investigações sinistras levam os personagens aos limites da sanidade.', 2, 1),
('O Despertar de Myrath', 'Um mal ancestral desperta em ruínas esquecidas por todos.', 1, 1),
('Códigos Fantasmas', 'Mensagens codificadas revelam conspirações em meio ao caos urbano.', 3, 1),
('O Sussurro no Escuro', 'Sussurros de entidades antigas ecoam por uma cidade amaldiçoada.', 2, 1);

-- Associação Campanha x Personagem
insert into Campanha_Personagem (fk_campanha, fk_personagem) values
(1, 26),
(1, 16),
(1, 1),
(1, 28),
(2, 22),
(2, 10),
(2, 35),
(2, 11),
(2, 8),
(2, 34),
(3, 27),
(3, 19),
(3, 3),
(3, 20),
(4, 14),
(4, 15),
(4, 12),
(4, 7),
(5, 23),
(5, 31),
(5, 9),
(5, 30),
(6, 29),
(6, 32),
(6, 6),
(6, 2),
(7, 18),
(7, 13),
(7, 33),
(7, 5),
(8, 17),
(8, 21),
(8, 25),
(8, 24),
(9, 4);