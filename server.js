require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const rotasFazendas = require('./routes/fazendas');
const rotasSafras = require('./routes/safras');

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    sistema: 'AgroDigital API - GPS.dev',
    versao: '2.0.0',
    rotas: [
      'GET  /api/fazendas',
      'GET  /api/fazendas/:id',
      'POST /api/fazendas',
      'PUT  /api/fazendas/:id',
      'DELETE /api/fazendas/:id',
      'GET  /api/safras',
      'GET  /api/safras/fazenda/:fazendaId',
      'POST /api/safras'
    ]
  });
});

app.use('/api/fazendas', rotasFazendas);
app.use('/api/safras', rotasSafras);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORTA, () => {
  console.log('========================================');
  console.log('  AGRODIGITAL API - GPS.dev');
  console.log(`  Servidor: http://localhost:${PORTA}`);
  console.log(`  API:      http://localhost:${PORTA}/api`);
  console.log('========================================');
});
