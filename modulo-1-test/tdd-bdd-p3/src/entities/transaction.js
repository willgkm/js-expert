class Transaction { 
  constructor ( { costumer , car, amount, dueDate }){
    this.costumer  = costumer;
    this.car = car;
    this.amount = amount;
    this.dueDate  = dueDate;
  }
}

module.exports = Transaction