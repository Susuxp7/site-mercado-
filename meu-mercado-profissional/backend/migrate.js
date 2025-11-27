const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const DB_PATH = './data/mercado.db';

module.exports = function init() {
  const dbExists = fs.existsSync(DB_PATH);
  const db = new sqlite3.Database(DB_PATH);
  db.serialize(() => {
    if (!dbExists) {
      db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'admin'
      )`);
      db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        image TEXT,
        stock INTEGER DEFAULT 0
      )`);
      db.run(`CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        customer_address TEXT,
        total REAL,
        status TEXT,
        items TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
      const stmt = db.prepare("INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)");
      stmt.run("Arroz 5kg", "Arroz de ótima qualidade", 18.90, "/uploads/placeholder.png", 50);
      stmt.run("Feijão 1kg", "Feijão carioca", 6.49, "/uploads/placeholder.png", 80);
      stmt.run("Açúcar 1kg", "Açúcar cristal", 3.29, "/uploads/placeholder.png", 100);
      stmt.finalize();
      // seed admin user (password: admin123)
      const bcrypt = require('bcrypt');
      const hash = bcrypt.hashSync('admin123', 10);
      db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hash, 'admin']);
      console.log('Database and seed created.');
    }
  });
  db.close();
};
