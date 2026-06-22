class TransactionService {
  constructor(accountRepository, verificationService, notificationService) {
    this.accountRepository = accountRepository;
    this.verificationService = verificationService;
    this.notificationService = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const sender = this.accountRepository.findByAccountId(fromAccountId);
    const receiver = this.accountRepository.findByAccountId(toAccountId);

    this.verificationService.verifyTransfer({ sender, receiver, fromAccountId, toAccountId, amount });

    this.accountRepository.updateBalance(fromAccountId, sender.balance - amount);
    this.accountRepository.updateBalance(toAccountId, receiver.balance + amount);

    const newTransaction = {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from: fromAccountId,
      to: toAccountId,
      amount: amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
    this.accountRepository.appendTransaction(newTransaction);

    this.notificationService.notifyDebit({
      email: sender.email,
      fromAccountId,
      amount,
      newBalance: sender.balance
    });
    this.notificationService.notifyCredit({
      email: receiver.email,
      fromAccountId,
      amount,
      newBalance: receiver.balance
    });

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction: newTransaction,
      balanceRestante: sender.balance
    };
  }

  getAccountBalance(accountId) {
    const account = this.accountRepository.findByAccountId(accountId);
    this.verificationService.verifyAccountExists(account, accountId);

    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}

module.exports = TransactionService;
