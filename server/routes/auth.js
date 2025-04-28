const express = require('express');
const bcrypt = require('bcryptjs');

module.exports = (pool) => {
    const router = express.Router();

    // Registrácia
    router.post('/register', async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Chýba používateľské meno alebo heslo' });
        }

        try {
            await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(100) UNIQUE, password VARCHAR(255))');

            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
            res.status(201).json({ message: 'Registrácia úspešná' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Chyba pri registrácii' });
        }
    });

    // Prihlásenie
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Chýba používateľské meno alebo heslo' });
        }

        try {
            const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if (result.rows.length === 0) {
                return res.status(400).json({ error: 'Nesprávne meno alebo heslo' });
            }

            const user = result.rows[0];
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return res.status(400).json({ error: 'Nesprávne meno alebo heslo' });
            }

            res.json({ message: 'Prihlásenie úspešné' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Chyba pri prihlásení' });
        }
    });

    return router;
};
