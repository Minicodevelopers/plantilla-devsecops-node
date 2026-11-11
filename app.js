const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('MinicoDevelopers - App segura');
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

app.get('/user', (req, res) => {
  const query = "SELECT * FROM users WHERE id = " + req.query.id;
  res.send(query);
});