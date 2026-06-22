const { transactionService } = require('../transaction-container');

function getBalance(req, res) {
  try {
    const accountId = req.query.accountId;
    
    if (!accountId) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Se debe pasa por parametro el accountId'
      });
    }

    const accountInfo = transactionService.getAccountBalance(accountId);
    return res.status(200).json(accountInfo);
  } catch (error) {
    return res.status(404).json({
      error: 'Recurso no encontrado',
      message: error.message
    });
  }
}

module.exports = {
  getBalance
};
