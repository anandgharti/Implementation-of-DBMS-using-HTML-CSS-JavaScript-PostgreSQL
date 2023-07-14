const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTables() {
  try {
    const createStudentsTableQuery = `
      CREATE TABLE IF NOT EXISTS tbl_students (
        rollno SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        dob DATE,
        age INTEGER,
        gender VARCHAR(20),
        contactno VARCHAR(10)
      )
    `;

    await pool.query(createStudentsTableQuery);
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error occurred while creating tables:', error);
  }
}

createTables();
