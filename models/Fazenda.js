const mongoose = require('mongoose');

const fazendaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  proprietario: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  pais: { type: String, required: true },
  areaHectares: { type: Number, required: true },
  culturaPrincipal: { type: String, required: true },
  ativa: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Fazenda', fazendaSchema);