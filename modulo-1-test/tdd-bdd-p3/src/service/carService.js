const Transaction = require("../entities/transaction");
const BaseRepository = require("../repository/base/baseRepository");
const Tax = require('./../entities/tax')

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBasedOnAge = Tax.taxesBasesOnAge
    this.currencyFormat = new Intl.NumberFormat('pt-br', { 
      style: 'currency', 
      currency: 'BRL'
    })
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandonCar(carCategory){
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]
    return  carId 
  }

  async getAvailableCar(carCategory){ 
    const carId = this.chooseRandonCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }

  calculateFinalPrice(costumer, carCategory, numberOfDays){
    const { age } = costumer
    const price = carCategory.price 
    const { then:tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((tax * price ) * (numberOfDays))
    const formatedFinalPrice = this.currencyFormat.format(finalPrice)
    return formatedFinalPrice
  }
 
  async rent(costumer, carCategory, numberOfDays){
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = await this.calculateFinalPrice(costumer,carCategory,numberOfDays)

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)

    const options  = { year: "numeric", month:"long", day: "numeric"}
    const dueDate = today.toLocaleDateString("pt-br", options)

    const transaction = new Transaction({
      costumer, 
      dueDate, 
      car,
      amount:finalPrice
    });

    return transaction;
  }

}
module.exports = CarService;
