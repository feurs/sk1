const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../app')));

// Routes
app.use('/auth', authRoutes(pool));
app.use('/students', studentRoutes(pool));

// Visits - počet návštev
app.get('/visits', async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS visits (count INTEGER)');
        const result = await pool.query('SELECT count FROM visits');
        if (result.rows.length === 0) {
            await pool.query('INSERT INTO visits (count) VALUES (1)');
            res.json({ count: 1 });
        } else {
            const count = result.rows[0].count + 1;
            await pool.query('UPDATE visits SET count = $1', [count]);
            res.json({ count });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Chyba servera');
    }
});

// Štart servera
app.listen(port, () => {
    console.log(`Server beží na porte ${port}`);
});
