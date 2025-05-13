const express = require('express');
const oracledb = require('oracledb');
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

// Route to fetch data (Example: Books data)
app.get('/api/books', async (req, res) => {
  let connection;
  try {
    // Create a connection to the Oracle database
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch data (e.g., from a table named 'books')
    const result = await connection.execute('SELECT * FROM books');

    // Return the result to the frontend
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from Oracle DB');
  } finally {
    if (connection) {
      try {
        // Close the connection to the database
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
