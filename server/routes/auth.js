const express = require('express');
const bcrypt = require('bcryptjs');

module.exports = (pool) => {
    const router = express.Router();

    // Registrácia
    router.post('/register', async (req, res) => {
        const { username, email, country, password } = req.body;
        if (!username || !email || !country || !password) {
            return res.status(400).json({ error: 'Chýba niektorý z údajov' });
        }

        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(100) UNIQUE,
                    email VARCHAR(100),
                    country VARCHAR(100),
                    password VARCHAR(255)
                )
            `);

            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'INSERT INTO users (username, email, country, password) VALUES ($1, $2, $3, $4)',
                [username, email, country, hashedPassword]
            );
            res.status(201).json({ message: 'Registrácia úspešná' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Chyba pri registrácii' });
        }
    });

    // Zoznam používateľov (bez hesla)
    router.get('/users', async (req, res) => {
        try {
            const result = await pool.query('SELECT username, email, country FROM users');
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Chyba pri načítaní používateľov' });
        }
    });

    return router;
};
