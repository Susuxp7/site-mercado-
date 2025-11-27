const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'troque_em_producao';

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token ausente' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, SECRET);
    req.user = data;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = { authenticate };
