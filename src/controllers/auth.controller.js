const jwtService = require('../services/jwt.service');
const { accountRepository } = require('../transaction-container');

function generateToken(req, res) {
  const { accountId } = req.body;

  if (!accountId) {
    return res.status(400).json({
      error: 'Petición incorrecta',
      message: 'El campo accountId es requerido'
    });
  }

  const user = accountRepository.findByAccountId(accountId);

  if (!user) {
    return res.status(404).json({
      error: 'Recurso no encontrado',
      message: `La cuenta '${accountId}' no existe.`
    });
  }

  const token = jwtService.signToken(user);

  return res.status(200).json({
    success: true,
    message: 'Token generado con éxito',
    tokenType: 'Bearer',
    token
  });
}

module.exports = {
  generateToken
};
