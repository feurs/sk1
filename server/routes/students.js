const express = require('express');

module.exports = (pool) => {
    const router = express.Router();

    // Vytvorenie študenta
    router.post('/', async (req, res) => {
        const { meno, statna_prislusnost, datum_narodenia, fakulta, priemer } = req.body;
        if (!meno || !statna_prislusnost || !datum_narodenia || !fakulta || priemer === undefined) {
            return res.status(400).json({ error: 'Chýbajú údaje študenta' });
        }

        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS students (
                    id SERIAL PRIMARY KEY,
                    meno VARCHAR(100),
                    statna_prislusnost VARCHAR(100),
                    datum_narodenia DATE,
                    fakulta VARCHAR(100),
                    priemer NUMERIC
                )
            `);

            await pool.query(
                'INSERT INTO students (meno, statna_prislusnost, datum_narodenia, fakulta, priemer) VALUES ($1, $2, $3, $4, $5)',
                [meno, statna_prislusnost, datum_narodenia, fakulta, priemer]
            );
            res.status(201).json({ message: 'Študent pridaný' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Chyba pri ukladaní študenta' });
        }
    });

    // Získanie všetkých študentov
    router.get('/', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM students');
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Chyba pri načítaní študentov' });
        }
    });

    return router;
};
