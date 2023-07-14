const express = require('express');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

// Serve static files
app.use(express.static(path.join(__dirname)));

app.post('/submit-student', async (req, res) => {
  try {
    const { rollno, name, address, dob, age, gender, contactno } = req.body;

    const query = `
      INSERT INTO tbl_students (rollno, name, address, dob, age, gender, contactno)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [rollno, name, address, dob, age, gender, contactno];
    await pool.query(query, values);

    res.json({ success: true });
  } catch (error) {
    console.error('Error occurred while inserting form data into tbl_students:', error);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
