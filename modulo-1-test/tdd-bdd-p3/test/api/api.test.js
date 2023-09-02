const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')
const validCarCategory = require('../mocks/valid-carCategory.json')
const validCostumer = require('../mocks/valid-customer.json')
const invalidCarCategory = require('../mocks/invalid-carCategory.json')


const validRentInfo = { costumer: validCostumer, carCategory: validCarCategory, rentDays:10  }

describe('API Suite test', () => {
  let app
  before((done) => {
    app = require('../../src/api')
    app.once('listening', done)
  })

  after(done => app.close(done))

  describe('/car:post', () => {
    it('should get a available car', async () => {
      const response = await supertest(app)
      .post('/car/available')
      .send(validCarCategory)
      .expect(200)
      
      assert.ok(response)
    })

    it('should get a error on passing a invalid carCategory', async () => {
      const response = await supertest(app)
      .post('/car/available')
      .send(invalidCarCategory)
      .expect(400)
      
      assert.ok(response)
    })

  })

  describe('/rent', () => {
  
    it('should get a rent a car given a costumer, carCategory e number of days', async () =>{
      const response = await supertest(app)
      .post('/rent')
      .send(validRentInfo)
      .expect(200)

      const jsonResponse = JSON.parse(response.text)
      const currencyFormat =  new Intl.NumberFormat('pt-br', { 
        style: 'currency', 
        currency: 'BRL'
      })
      const expectAmount = currencyFormat.format(711.36)
      assert.strictEqual(jsonResponse.amount, expectAmount )
    })
  
  })
  

  describe('/unknow', () => {
    it('should get unknow route from api', async () => {
      const response = await supertest(app)
      .get('/unknow')
      .expect(404)

      assert.equal(response.text, "not found!")
    })
  })

})