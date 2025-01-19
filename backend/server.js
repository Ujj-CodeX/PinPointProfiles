const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios'); // Import axios for making HTTP requests

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./profiles.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// API: Fetch all profiles
app.get('/api/profiles', (req, res) => {
  const query = 'SELECT id, name, email, bio, location, latitude, longitude FROM Profile'; // Ensure latitude and longitude are included
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching profiles:', err.message);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows); // Send all rows as JSON including lat and lng
    }
  });
});

// API: Fetch a single profile by ID
app.get("/api/profiles/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Profile WHERE id = ?";

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error("Failed to fetch profile:", err.message);
      res.status(500).json({ error: "Failed to fetch profile" });
    } else if (!row) {
      res.status(404).json({ error: "Profile not found" });
    } else {
      res.json(row); // Send the profile data with lat and lng
    }
  });
});

// API: Update an existing profile by ID (PUT)
app.put('/api/profiles/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age, bio, location, latitude, longitude } = req.body;

  if (!name || !email || !age || !bio || !location || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    UPDATE Profile
    SET name = ?, email = ?, age = ?, bio = ?, location = ?, latitude = ?, longitude = ?
    WHERE id = ?
  `;
  const params = [name, email, age, bio, location, latitude, longitude, id];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error updating profile:', err.message);
      res.status(500).json({ error: 'Failed to update profile' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Profile not found' });
    } else {
      res.status(200).json({ message: 'Profile updated successfully' });
    }
  });
});

// API: Add a new profile (POST)
app.post('/api/profiles', (req, res) => {
  const { name, email, age, bio, location, latitude, longitude } = req.body;

  if (!name || !email || !age || !bio || !location || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO Profile (name, email, age, bio, location, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [name, email, age, bio, location, latitude, longitude];

  db.run(query, params, function (err) {
    if (err) {
      console.error('Error adding profile:', err.message);
      res.status(500).json({ error: 'Failed to add profile' });
    } else {
      res.status(201).json({ id: this.lastID, message: 'Profile created successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// API: Delete a profile by ID (DELETE)
app.delete('/api/profiles/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Profile WHERE id = ?';
  
    db.run(query, [id], function(err) {
      if (err) {
        console.error('Error deleting profile:', err.message);
        res.status(500).json({ error: 'Failed to delete profile' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Profile not found' });
      } else {
        res.status(200).json({ message: 'Profile deleted successfully' });
      }
    });
  });
  