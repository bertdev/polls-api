import request from 'supertest'
import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { app } from './../config/app'

describe('Login routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'herbert',
          email: 'mail_valid@email.com',
          password: 'password',
          confirmationPassword: 'password'
        })
        .expect(200)
    })
  })
})
