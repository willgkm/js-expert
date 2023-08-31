const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')
const validCarCategory = require('../mocks/valid-carCategory.json')


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
      .post('/car')
      .send(validCarCategory)
      .expect(200)
      
      assert.ok(response)
    })

  })

})