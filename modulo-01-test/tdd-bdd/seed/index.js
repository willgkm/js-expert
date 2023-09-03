const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Costumer = require("../src/entities/costumer");

const faker = require("faker");
const { join } = require("path");
const { writeFile } = require("fs/promises");
 
const seederBaseFolder = join(__dirname, "../", "database");
const ITENS_AMOUNT = 2;
const carCategories = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = [];
const costumers = [];
for (let index = 0; index <= ITENS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    avalible: true,
    gasAvalible: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategories.carIds.push(car.id);
  cars.push(car);

  const costumer = new Costumer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({min:18, max:60})
  })
  costumers.push(costumer)
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data));
(async () => {
  await write("cars.json", cars);
  await write("carCategories.json", [carCategories]);
  await write("costumers.json", [costumers]);

  console.log("car", cars);
  console.log("carCategories", carCategories);
  console.log("costumers ", costumers);
})();
