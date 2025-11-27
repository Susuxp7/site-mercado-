const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');

// create order (public)
router.post('/', (req, res) => {
  const { customer_name, customer_address, items, total } = req.body;
  const itemsStr = JSON.stringify(items);
  db.run('INSERT INTO orders (customer_name, customer_address, items, total, status) VALUES (?, ?, ?, ?, ?)', [customer_name, customer_address, itemsStr, total, 'pending'], function(err){
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// list orders (admin)
router.get('/', authenticate, (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
