// ============================================
// AGRODIGITAL API - Servidor principal
// GPS.dev - Gustavo Paula Santos
// ============================================
// Este arquivo é o "coração" do backend.
// Ele inicia o servidor e conecta as rotas.
// ============================================

const express = require('express');
const cors = require('cors');
const path = require('path');

const rotasFazendas = require('./routes/fazendas');
const rotasSafras = require('./routes/safras');

const app = express();
const PORTA = process.env.PORT || 3000;

// --- Middlewares (funções que rodam ANTES das rotas) ---

// Permite que o front-end (outro endereço) acesse esta API
app.use(cors());

// Faz o Express entender JSON no corpo das requisições
app.use(express.json());

// Serve arquivos estáticos da pasta /public (página de teste)
app.use(express.static(path.join(__dirname, 'public')));

// Log simples: mostra no terminal cada requisição recebida
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString('pt-BR')}] ${req.method} ${req.url}`);
  next(); // passa para a próxima etapa
});

// --- Rotas ---

// Rota raiz da API: confirma que o servidor está vivo
app.get('/api', (req, res) => {
  res.json({
    sistema: 'AgroDigital API',
    versao: '1.0.0',
    autor: 'GPS.dev',
    status: 'online',
    rotas: [
      'GET    /api/fazendas',
      'GET    /api/fazendas/:id',
      'POST   /api/fazendas',
      'PUT    /api/fazendas/:id',
      'DELETE /api/fazendas/:id',
      'GET    /api/safras',
      'GET    /api/safras/fazenda/:fazendaId',
      'POST   /api/safras'
    ]
  });
});

app.use('/api/fazendas', rotasFazendas);
app.use('/api/safras', rotasSafras);

// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// --- Iniciar servidor ---
app.listen(PORTA, () => {
  console.log('==========================================');
  console.log('  AGRODIGITAL API - GPS.dev');
  console.log(`  Servidor rodando: http://localhost:${PORTA}`);
  console.log(`  Teste a API em:   http://localhost:${PORTA}/api`);
  console.log(`  Página de teste:  http://localhost:${PORTA}`);
  console.log('==========================================');
});
