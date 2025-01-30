const express = require('express');
const cors = require('cors');
const connection = require('./db/connection.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Conexão com banco de dados
connection();

// Rotas
const routes = require('./routes/router.js');

app.use('/api', routes);

app.listen(port, () => console.log('Servidor online!'));