DROP TABLE IF EXISTS equipamentos;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS setores;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE setores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE equipamentos (
    id SERIAL PRIMARY KEY,
    numero_serie VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    categoria_id INTEGER NOT NULL,
    setor_id INTEGER NOT NULL,
    CONSTRAINT fk_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id),
    CONSTRAINT fk_setor
        FOREIGN KEY (setor_id)
        REFERENCES setores(id)
);

INSERT INTO categorias (nome) VALUES
('Notebook'),
('Monitor'),
('Periférico');

INSERT INTO setores (nome) VALUES
('TI'),
('Financeiro'),
('RH');

INSERT INTO equipamentos (
    numero_serie,
    modelo,
    status,
    categoria_id,
    setor_id
) VALUES
('SN001', 'Dell Latitude 5420', 'Disponível', 1, 1),
('SN002', 'LG UltraWide 29"', 'Em uso', 2, 2),
('SN003', 'Logitech MX Keys', 'Manutenção', 3, 1);