const http = require("http");
const { once } = require("events");
const CarService = require("../src/service/carService");
const validCarCategory = require('../test/mocks/valid-carCategory.json');
const { join } = require("path");
const { log } = require("console");

const carDatabase = join(__dirname, "./../database", "cars.json");
const carService = new CarService({ cars: carDatabase });

const routes = {
  "/car/available:post": async (request, response) => {
    try {
      let data = await once(request, "data"); 
      let result = await carService.getAvailableCar(JSON.parse(data))
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(result));
      return response.end()
    } catch (error) {
      response.writeHead(400, {'Content-Type': 'application/json' });
      response.write(JSON.stringify(error))
      return response.end()
    }
  },
  "/rent:post": async (request, response) => {
    try {
      let data = JSON.parse(await once(request, "data" ))
      let transaction = await carService.rent(data.costumer, data.carCategory, data.rentDays);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(transaction));
      return response.end()
    } catch (error) {
      response.writeHead(400, {'Content-Type': 'application/json' });
      response.write(JSON.stringify(error))
      return response.end()
    }
  },
  default(request, response) {
    response.writeHead(404);
    return response.end("not found!");
  },
};

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("running at 3000"));

module.exports = app;
