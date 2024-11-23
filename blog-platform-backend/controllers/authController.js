const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersPath = path.join(__dirname, '../data/users.json');

// Helper function to read users
const readUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

// Helper function to save users
const saveUsers = (users) => fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

// Sign-up
exports.signup = (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  users.push({ id: Date.now(), email, passwordHash });
  saveUsers(users);

  res.status(201).json({ message: 'User registered successfully' });
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((user) => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
