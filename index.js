const express = require('express');
const fs = require('fs');
const users = require('./users.json');

const app = express();
const PORT = 8000;

// Middleware plugin
app.use(express.urlencoded({ extended: false }));

app.get('/api/users', (req, res) => {
  res.json(users);
})

app.post('/api/users', (req, res) => {
  // TODO : Create new user
  const body = req.body;
  console.log("Body", body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile('./users.json', JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  })
})

app.route("/api/users/:id")
  .get((req, res) => {
    // Get the user with ID
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res) => {
    // Edit form with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // Delete form with id
    return res.json({ status: "pending" });
  });


app.get('/users', (req, res) => {
  const html = `
    <ul>${users.map(user => `<li>${user.first_name}</li>`).join("")}.jon</ul>
  `;
  res.send(html);
})

app.listen(PORT, () => console.log("Server Started..."));