import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface ITransaction{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }


  public execute(obj:ITransaction): Transaction {
      const balance = this.transactionsRepository.getBalance();
      if(obj.type === "outcome" && obj.value > balance.total){
        throw new Error("Erro saldo insuficiente");
      }
      const transaction = this.transactionsRepository.create(obj);
      return transaction;
  }
}

export default CreateTransactionService;
