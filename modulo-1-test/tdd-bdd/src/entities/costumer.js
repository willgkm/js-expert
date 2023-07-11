const Base  = require("./base/base.js");
class Costumer extends Base {
  constructor({ id, name, age }) {
    super({ id, name });
    this.age = age
  }
}

module.exports = Costumer;
