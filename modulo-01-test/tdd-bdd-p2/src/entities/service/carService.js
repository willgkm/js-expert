const BaseRepository = require("./../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
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

  async  getAvailableCar(carCategory){ 
    const carId = this.chooseRandonCar(carCategory)
    const car = await this.carRepository.find(carId)

    return car
  }

  test() {
    return this.carRepository.find();
  }
}
module.exports = CarService;
