const Sentry = require('@sentry/node');
const { transactionService } = require('../transaction-container');

function executeTransfer(req, res) {
  const { fromAccountId, toAccountId, amount, simulateDbFailure } = req.body;

  if (!fromAccountId || !toAccountId || amount === undefined) {
    return res.status(400).json({
      error: 'Petición incorrecta',
      message: 'Los campos fromAccountId, toAccountId y amount son requeridos'
    });
  }

  try {
    if (simulateDbFailure === true) {
      const dbError = new Error('Conexión interrumpida con el Clúster de Datos SecurePay');
      dbError.isOperational = true;
      throw dbError;
    }

    const result = transactionService.executeTransfer(fromAccountId, toAccountId, Number(amount));
    return res.status(200).json(result);
  } catch (error) {

    if (error.isOperational) {

      Sentry.withScope((scope) => {
        scope.setLevel('fatal');
        scope.setTag('affected_user_id', req.user?.sub || 'desconocido');
        scope.setTag('endpoint', 'POST /v1/transfer-beta/execute');
        scope.setContext('transferencia', { fromAccountId, toAccountId, amount });
        Sentry.captureException(error);
      });

      return res.status(500).json({
        error: 'Error interno del servidor',
        message: error.message
      });
    }

    return res.status(400).json({
      error: 'Error en la transacción',
      message: error.message
    });
  }
}

module.exports = {
  executeTransfer
};
