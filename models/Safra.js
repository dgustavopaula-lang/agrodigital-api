const mongoose = require('mongoose');

const safraSchema = new mongoose.Schema({
  fazendaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fazenda', required: true },
  cultura: { type: String, required: true },
  anoSafra: { type: String, required: true },
  areaPlantadaHectares: { type: Number, default: 0 },
  producaoEstimadaSacas: { type: Number, default: 0 },
  status: { type: String, enum: ['planejada', 'em_andamento', 'colhida'], default: 'planejada' }
}, { timestamps: true });

module.exports = mongoose.model('Safra', safraSchema);