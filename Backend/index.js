const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
const port = 3000;

// Use CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Import database configuration
const dbConfig = require('../Connection/config.js'); // Path to your config.js file

// Create a PostgreSQL connection pool
// This manages connections to your database efficiently
const pool = new Pool(dbConfig);

// Event listener for successful connections (optional but good for debugging)
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Event listener for errors in the connection pool (important for error handling)
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  // Consider more graceful error handling in production, like logging and trying to recover
  process.exit(-1); // Exit process if there's a serious database error
});

// Route to fetch data (Example: Books data)
app.get('/api/books', async (req, res) => {
  let client; // Declare client variable outside try block for finally block access
  try {
    // Get a client from the connection pool
    client = await pool.connect();

    // Query to fetch data from the 'books' table
    // PostgreSQL uses standard SQL. Table and column names are typically lowercase.
    const result = await client.query('SELECT * FROM books');

    // pg returns the rows in the 'rows' property of the result object
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).send('Error fetching data from PostgreSQL DB');
  } finally {
    // Ensure the client is released back to the pool, even if an error occurs
    if (client) {
      client.release();
    }
  }
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});