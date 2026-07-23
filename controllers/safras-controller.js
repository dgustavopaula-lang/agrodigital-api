const Safra = require('../models/Safra');
const Fazenda = require('../models/Fazenda');

async function listar(req, res) {
  try {
    const safras = await Safra.find().populate('fazendaId', 'nome cidade pais');
    res.json(safras);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function listarPorFazenda(req, res) {
  try {
    const safras = await Safra.find({ fazendaId: req.params.fazendaId });
    res.json(safras);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

async function criar(req, res) {
  try {
    const { fazendaId } = req.body;
    const fazendaExiste = await Fazenda.findById(fazendaId);
    if (!fazendaExiste) return res.status(400).json({ erro: `Fazenda ${fazendaId} não existe` });
    const safra = new Safra(req.body);
    await safra.save();
    res.status(201).json(safra);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

module.exports = { listar, listarPorFazenda, criar };
