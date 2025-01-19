const express = require('express');
const router = express.Router();
const db = require('./database');

// Fetch all users
router.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Add a new user
router.post('/users', (req, res) => {
  const { name, location, bio } = req.body;
  db.run(
    'INSERT INTO users (name, location, bio) VALUES (?, ?, ?)',
    [name, location, bio],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, name, location, bio });
      }
    }
  );
});

// Edit a user
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, location, bio } = req.body;
  db.run(
    'UPDATE users SET name = ?, location = ?, bio = ? WHERE id = ?',
    [name, location, bio, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    }
  );
});

// Delete a user
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

module.exports = router;
