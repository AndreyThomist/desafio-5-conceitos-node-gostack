import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ITransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcome = this.transactions.filter(transaction => transaction.type === "outcome")
    const ReducedOutcome = outcome.reduce((previous, current) => {
      return previous + current.value;
    }, 0)
    const income = this.transactions.filter(transaction => transaction.type === "income")
    const reducedIncome = income.reduce((previous, current) => {
      return previous + current.value;
    }, 0)
    const Balance = {
      outcome: ReducedOutcome,
      income: reducedIncome,
      total: reducedIncome - ReducedOutcome
    }
    return Balance;
  }

  public create(obj: ITransaction): Transaction {
    const transaction = new Transaction(obj);
    this.transactions.push(transaction)
    return transaction;
  }
}

export default TransactionsRepository;
