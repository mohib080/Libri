const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/html')));
app.use(express.static(path.join(__dirname, '../frontend')));





const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = require('../Connection/config.js');


const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);

  process.exit(-1);
});


app.get('/api/books', async (req, res) => {
  let client;
  try {

    client = await pool.connect();


    const result = await client.query('SELECT * FROM book');
    // console.log('Data fetched from PostgreSQL DB:', result.rows);


    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).send('Error fetching data from PostgreSQL DB');
  } finally {
    if (client) {
      client.release();
    }
  }
});
app.get('/api/books/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  let client;

  try {
    client = await pool.connect();

    const searchQuery = `
      SELECT * FROM book
      WHERE LOWER(title) LIKE LOWER($1)
         OR LOWER(author) LIKE LOWER($1)
    `;

    const result = await client.query(searchQuery, [`%${query}%`]);
    console.log('Search results:', result.rows);

    res.json(result.rows);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).send('Error searching books');
  } finally {
    if (client) client.release();
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});