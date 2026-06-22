const jwtService = require('../services/jwt.service');
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Falta la cabecera Authorization en la petición.'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Acceso no autorizado',
      message: 'Formato de cabecera de autenticación debe ser Bearer.'
    });
  }

  const token = parts[1];

  try {
    const decodedToken = jwtService.verifyToken(token);

    req.user = decodedToken;

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'La sesión ha expirado. Por favor, solicite un nuevo token.'
      });
    }

    return res.status(403).json({
      error: 'Token inválido',
      message: 'La firma del token no es válida o ha sido manipulado.'
    });
  }
}

module.exports = authMiddleware;
