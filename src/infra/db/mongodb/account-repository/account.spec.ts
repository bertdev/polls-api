import { AccountMongoRepository } from './account'
import { mongoHelper } from './../helpers/mongo-helper'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account MongoRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('Should return an new account id on success', async () => {
    const sut = makeSut()
    const accountId = await sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
    expect(accountId).toBeTruthy()
  })
})
