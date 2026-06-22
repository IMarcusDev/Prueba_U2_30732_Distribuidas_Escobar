const jwt = require('jsonwebtoken');
const config = require('../config/env');

/**
 * Genera un Token JWT firmado con clave privada asimétrica (RS256).
 * 
 * @param {Object} user - Objeto con la información del usuario a firmar.
 * @returns {string} JWT Token firmado.
 */
function signToken(user) {
  const payload = {
    sub: user.id || user.sub,
    name: user.name || user.email
  };

  return jwt.sign(payload, config.PRIVATE_KEY, {
    algorithm: config.JWT_ALGORITHM,
    expiresIn: config.JWT_EXPIRES_IN
  });
}

/**
 * Verifica un Token JWT utilizando la clave pública asimétrica (RS256).
 * 
 * @param {string} token - Token JWT a verificar.
 * @returns {Object} Payload decodificado si es válido.
 */
function verifyToken(token) {
  return jwt.verify(token, config.PUBLIC_KEY, { algorithms: [config.JWT_ALGORITHM] });
}

module.exports = {
  signToken,
  verifyToken
};
