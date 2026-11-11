const express = require('express');
const mysql = require('mysql');
const { exec } = require('child_process');

// nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
// Justificación: la app solo expone rutas GET sin sesiones ni cookies; CSRF no aplica.
const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'clave',
  database: 'demo'
});

app.get('/', (req, res) => {
  res.send('MinicoDevelopers - App segura');
});

// CÓDIGO VULNERABLE A PROPÓSITO (solo para la prueba de SAST)
// Inyección SQL: la entrada del usuario se concatena en la consulta
app.get('/user', (req, res) => {
  db.query("SELECT * FROM users WHERE id = " + req.query.id, (err, rows) => {
    res.json(rows);
  });
});

// Inyección de comandos: la entrada del usuario se ejecuta en el sistema
app.get('/ping', (req, res) => {
  exec('ping -c 1 ' + req.query.host, (err, out) => {
    res.send(out);
  });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));