const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL pripojenie
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Chyba servera" });
    }
});

// Endpoint na IP adresu
app.get('/ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json({ ip });
});

// Štart servera
app.listen(port, () => {
    console.log(`Server beží na porte ${port}`);
});
