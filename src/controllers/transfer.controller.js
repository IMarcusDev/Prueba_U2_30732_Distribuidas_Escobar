const { transactionService } = require('../transaction-container');

function executeTransfer(req, res) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    if (!fromAccountId || !toAccountId || amount === undefined) {
      return res.status(400).json({
        error: 'Petición incorrecta',
        message: 'Los campos fromAccountId, toAccountId y amount son requeridos'
      });
    }

    const result = transactionService.executeTransfer(fromAccountId, toAccountId, Number(amount));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      error: 'Error en la transacción',
      message: error.message
    });
  }
}

module.exports = {
  executeTransfer
};
