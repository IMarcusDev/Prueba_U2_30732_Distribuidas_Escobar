class AccountRepository {
  constructor() {
    this._usersDb = [
      { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
      { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
    ];
    this._transactionsHistory = [];
  }

  findByAccountId(accountId) {
    return this._usersDb.find(u => u.accountAlpha === accountId) || null;
  }

  updateBalance(accountId, newBalance) {
    const account = this.findByAccountId(accountId);
    if (account) {
      account.balance = newBalance;
    }
    return account;
  }

  appendTransaction(transaction) {
    this._transactionsHistory.push(transaction);
    return transaction;
  }

  getHistory() {
    return this._transactionsHistory;
  }
}

module.exports = AccountRepository;
