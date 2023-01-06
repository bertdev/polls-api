import request from 'supertest'
import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from './../config/app'

describe('Signup routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  afterEach(async () => {
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('Should return an account id on succes', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'herbert',
        email: 'mailvalid@email.com',
        password: 'password',
        confirmationPassword: 'password'
      })
      .expect(200)
  })
})
