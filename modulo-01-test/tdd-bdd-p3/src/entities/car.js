const Base  = require("./base/base");
class Car extends Base {
  constructor({ id, name, releaseYear, avalible, gasAvalible }) {
    super({ id, name });
    this.releaseYear = releaseYear;
    this.avalible = avalible;
    this.gasAvalible = gasAvalible;
  }
}

module.exports = Car;
