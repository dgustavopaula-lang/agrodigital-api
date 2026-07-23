require("dotenv").config();
const mongoose = require("mongoose");
const Fazenda = require("./models/Fazenda");
const Safra = require("./models/Safra");

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB conectado");

  await Fazenda.deleteMany({});
  await Safra.deleteMany({});
  console.log("Dados anteriores removidos");

  const fazendas = await Fazenda.insertMany([
    {
      nome: "Fazenda do Lago",
      proprietario: "Altair Paula de Oliveira",
      cidade: "Sao Simao",
      estado: "GO",
      pais: "Brasil",
      areaHectares: 2478,
      culturaPrincipal: "Soja",
      ativa: true
    },
    {
      nome: "Fazenda Saudade",
      proprietario: "Altair Paula de Oliveira",
      cidade: "Paranaiguara",
      estado: "GO",
      pais: "Brasil",
      areaHectares: 330,
      culturaPrincipal: "Soja",
      ativa: true
    },
    {
      nome: "Fazenda Pateirinho",
      proprietario: "Altair Paula de Oliveira",
      cidade: "Sao Simao",
      estado: "GO",
      pais: "Brasil",
      areaHectares: 200,
      culturaPrincipal: "Milho",
      ativa: true
    },
    {
      nome: "Fazenda Santa Luzia",
      proprietario: "Altair Paula de Oliveira",
      cidade: "Paranaiguara",
      estado: "GO",
      pais: "Brasil",
      areaHectares: 164,
      culturaPrincipal: "Soja",
      ativa: true
    },
    {
      nome: "Fazenda Pipe",
      proprietario: "Altair Paula de Oliveira",
      cidade: "Malanje",
      estado: "Malanje",
      pais: "Angola",
      areaHectares: 8600,
      culturaPrincipal: "Soja",
      ativa: true
    }
  ]);

  console.log("Fazendas inseridas:", fazendas.map(f => f.nome));

  await Safra.insertMany([
    { fazendaId: fazendas[0]._id, cultura: "Soja", anoSafra: "2025/2026", areaPlantadaHectares: 2000, producaoEstimadaSacas: 120000, status: "em_andamento" },
    { fazendaId: fazendas[0]._id, cultura: "Milho", anoSafra: "2025/2026", areaPlantadaHectares: 400, producaoEstimadaSacas: 48000, status: "em_andamento" },
    { fazendaId: fazendas[1]._id, cultura: "Soja", anoSafra: "2025/2026", areaPlantadaHectares: 280, producaoEstimadaSacas: 16800, status: "planejada" },
    { fazendaId: fazendas[2]._id, cultura: "Milho", anoSafra: "2025/2026", areaPlantadaHectares: 180, producaoEstimadaSacas: 21600, status: "planejada" },
    { fazendaId: fazendas[3]._id, cultura: "Soja", anoSafra: "2025/2026", areaPlantadaHectares: 140, producaoEstimadaSacas: 8400, status: "planejada" },
    { fazendaId: fazendas[4]._id, cultura: "Soja", anoSafra: "2025/2026", areaPlantadaHectares: 3000, producaoEstimadaSacas: 180000, status: "em_andamento" },
    { fazendaId: fazendas[4]._id, cultura: "Milho", anoSafra: "2025/2026", areaPlantadaHectares: 2000, producaoEstimadaSacas: 240000, status: "em_andamento" }
  ]);

  console.log("Safras inseridas com sucesso");
  await mongoose.disconnect();
}

seed().catch(err => { console.error(err); process.exit(1); });
