import { AccountMongoRepository } from './account'
import { mongoHelper } from './../helpers/mongo-helper'

describe('Account MongoRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('valid_name')
    expect(account.email).toBe('valid_email@mail.com')
  })
})
