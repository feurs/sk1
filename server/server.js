const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Nastavenie PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Statické súbory
app.use(express.static(path.join(__dirname, '../app')));

// Endpoint na počet návštev
app.get('/visits', async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS visits (count INTEGER)');
        const result = await pool.query('SELECT count FROM visits');
        
        if (result.rows.length === 0) {
            await pool.query('INSERT INTO visits (count) VALUES (1)');
            res.json({ count: 1 });
        } else {
            let count = result.rows[0].count + 1;
            await pool.query('UPDATE visits SET count = $1', [count]);
            res.json({ count });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Chyba servera');
    }
});

app.listen(port, () => {
    console.log(`Server beží na porte ${port}`);
});

