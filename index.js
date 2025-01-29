const express = require('express');
const users = require('./users.json');

const app = express();
const PORT = 8000;

app.get('/api/users', (req, res) => {
  res.json(users);
})
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json(user);
})

app.post('/api/users', (req, res) => {
  // TODO : Create new user
  return res.json({ status: "pending" });
})

app.patch('/api/users/:id', (req, res) => {
  // TODO : Edit the user with id 
  return res.json({ status: "pending" });
})
app.delete('/api/users/:id', (req, res) => {
  // TODO : Delete the user with id 
  return res.json({ status: "pending" });
})

app.get('/users', (req, res) => {
  const html = `
    <ul>${users.map(user => `<li>${user.first_name}</li>`).join("")}.jon</ul>
  `;
  res.send(html);
})

app.listen(PORT, () => console.log("Server Started..."));