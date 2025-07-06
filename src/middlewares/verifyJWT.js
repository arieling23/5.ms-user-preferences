const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('🧪 Header recibido:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ Token no proporcionado o malformado');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🧪 Token extraído:', token);
  console.log('🔑 JWT_SECRET en uso:', process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decodificado correctamente:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ Error al verificar el token:', err.message);
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = verifyJWT;
