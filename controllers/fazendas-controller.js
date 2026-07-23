const Fazenda = require('../models/Fazenda');

async function listar(req, res) {
  try {
    const fazendas = await Fazenda.find();
    res.json(fazendas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const fazenda = await Fazenda.findById(req.params.id);
    if (!fazenda) return res.status(404).json({ erro: 'Fazenda não encontrada' });
    res.json(fazenda);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function criar(req, res) {
  try {
    const fazenda = new Fazenda(req.body);
    await fazenda.save();
    res.status(201).json(fazenda);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function atualizar(req, res) {
  try {
    const fazenda = await Fazenda.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!fazenda) return res.status(404).json({ erro: 'Fazenda não encontrada' });
    res.json(fazenda);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function remover(req, res) {
  try {
    const fazenda = await Fazenda.findByIdAndDelete(req.params.id);
    if (!fazenda) return res.status(404).json({ erro: 'Fazenda não encontrada' });
    res.json({ mensagem: 'Fazenda removida com sucesso', fazenda });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
