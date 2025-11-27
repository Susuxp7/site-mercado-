const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');

router.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(row);
  });
});

// create (admin)
router.post('/', authenticate, (req, res) => {
  const { name, description, price, image, stock } = req.body;
  db.run('INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)', [name, description, price, image, stock], function(err){
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

router.put('/:id', authenticate, (req, res) => {
  const { name, description, price, image, stock } = req.body;
  db.run('UPDATE products SET name=?, description=?, price=?, image=?, stock=? WHERE id=?', [name, description, price, image, stock, req.params.id], function(err){
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

router.delete('/:id', authenticate, (req, res) => {
  db.run('DELETE FROM products WHERE id=?', [req.params.id], function(err){
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
