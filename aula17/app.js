const express = require('express');
const app = express();
const port = 3000;

// Trata o express como JSON (mesmo que body-parser)
app.use(express.json());

app.listen(port, () => {
  console.log(`RODANDO NA PORTA ${port}`);
});

let db = [
  {
    id: 1,
    firstname: 'Jhon',
    lastname: 'Doe',
    email: 'rdlnk@example.com',
  },
  {
    id: 2,
    firstname: 'mary',
    lastname: 'jane',
    email: 'sirvodenada@example.com',
  },
  {
    id: 3,
    firstname: 'michele',
    lastname: 'jones',
    email: 'quemepeter@example.com',
  },
  {
    id: 4,
    firstname: 'peter',
    lastname: 'parker',
    email: 'reidelas@example.com',
  },
];

// Get all users
app.get('/users', (req, res) => {
  res.json(db);
});

// Get user by id
app.get('/users/:id', (req, res) => {
  const user = db.find(user => user.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Create a new user
app.post('/users', (req, res) => {
  const lastID = Math.max(...db.map(user => user.id), 0);
  const user = {
    id: lastID + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  };
  db.push(user);
  res.status(201).json(user);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = db.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    db.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

// Update a user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = db.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    db[userIndex] = {
      id: userId,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };
    res.json(db[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});
