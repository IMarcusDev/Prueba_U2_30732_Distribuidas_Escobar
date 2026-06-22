const AccountRepository = require('./repositories/account.repository');
const FinancialVerificationService = require('./services/financial-verification.service');
const ConsoleNotificationService = require('./services/console-notification.service');
const TransactionService = require('./services/transaction.service');

const accountRepository = new AccountRepository();
const verificationService = new FinancialVerificationService();
const notificationService = new ConsoleNotificationService();

const transactionService = new TransactionService(
  accountRepository,
  verificationService,
  notificationService
);

module.exports = {
  accountRepository,
  verificationService,
  notificationService,
  transactionService
};
