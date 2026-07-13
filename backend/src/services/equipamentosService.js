import pool from "../config/db.js";

export async function listarEquipamentos() {
  const sql = `
    SELECT
      e.id,
      e.numero_serie,
      e.modelo,
      e.status,
      e.categoria_id,
      c.nome AS categoria,
      e.setor_id,
      s.nome AS setor
    FROM equipamentos e
    INNER JOIN categorias c ON c.id = e.categoria_id
    INNER JOIN setores s ON s.id = e.setor_id
    ORDER BY e.id;
  `;

  const resultado = await pool.query(sql);
  return resultado.rows;
}

export async function buscarEquipamentoPorId(id) {
  const sql = `
    SELECT
      e.id,
      e.numero_serie,
      e.modelo,
      e.status,
      e.categoria_id,
      c.nome AS categoria,
      e.setor_id,
      s.nome AS setor
    FROM equipamentos e
    INNER JOIN categorias c ON c.id = e.categoria_id
    INNER JOIN setores s ON s.id = e.setor_id
    WHERE e.id = $1;
  `;

  const resultado = await pool.query(sql, [id]);
  return resultado.rows[0];
}

export async function criarEquipamento(dados) {
  const {
    numero_serie,
    modelo,
    status,
    categoria_id,
    setor_id,
  } = dados;

  const sql = `
    INSERT INTO equipamentos
    (numero_serie, modelo, status, categoria_id, setor_id)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;

  const resultado = await pool.query(sql, [
    numero_serie,
    modelo,
    status,
    categoria_id,
    setor_id,
  ]);

  return resultado.rows[0];
}

export async function atualizarEquipamento(id, dados) {
  const {
    numero_serie,
    modelo,
    status,
    categoria_id,
    setor_id,
  } = dados;

  const sql = `
    UPDATE equipamentos
    SET
      numero_serie = $1,
      modelo = $2,
      status = $3,
      categoria_id = $4,
      setor_id = $5
    WHERE id = $6
    RETURNING *;
  `;

  const resultado = await pool.query(sql, [
    numero_serie,
    modelo,
    status,
    categoria_id,
    setor_id,
    id,
  ]);

  return resultado.rows[0];
}

export async function excluirEquipamento(id) {
  const sql = `
    DELETE FROM equipamentos
    WHERE id = $1
    RETURNING *;
  `;

  const resultado = await pool.query(sql, [id]);

  return resultado.rows[0];
}