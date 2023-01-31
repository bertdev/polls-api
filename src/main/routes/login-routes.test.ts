import { Collection } from 'mongodb'
import request from 'supertest'
import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { hash } from 'bcrypt'
import { app } from './../config/app'

describe('Login routes', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  afterEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
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

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('password', 12)
      await accountCollection.insertOne({
        name: 'herbert',
        email: 'mail_valid@email.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'mail_valid@email.com',
          password: 'password'
        })
        .expect(200)
    })
  })
})
