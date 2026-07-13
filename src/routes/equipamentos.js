import { Router } from "express";

import {
  listarEquipamentos,
  buscarEquipamentoPorId,
  criarEquipamento,
  atualizarEquipamento,
  excluirEquipamento,
} from "../services/equipamentosService.js";

const router = Router();

// GET - Todos
router.get("/", async (req, res) => {
  try {
    const equipamentos = await listarEquipamentos();
    res.json(equipamentos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar equipamentos." });
  }
});

// GET - Por ID
router.get("/:id", async (req, res) => {
  try {
    const equipamento = await buscarEquipamentoPorId(req.params.id);

    if (!equipamento) {
      return res.status(404).json({
        erro: "Equipamento não encontrado.",
      });
    }

    res.json(equipamento);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao buscar equipamento." });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const equipamento = await criarEquipamento(req.body);
    res.status(201).json(equipamento);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar equipamento." });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const equipamento = await atualizarEquipamento(
      req.params.id,
      req.body
    );

    if (!equipamento) {
      return res.status(404).json({
        erro: "Equipamento não encontrado.",
      });
    }

    res.json(equipamento);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao atualizar equipamento." });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const equipamento = await excluirEquipamento(req.params.id);

    if (!equipamento) {
      return res.status(404).json({
        erro: "Equipamento não encontrado.",
      });
    }

    res.json({
      mensagem: "Equipamento excluído com sucesso.",
      equipamento,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao excluir equipamento." });
  }
});

export default router;