import { AccountMongoRepository } from './account'
import { mongoHelper } from './../helpers/mongo-helper'
import { Collection } from 'mongodb'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection
describe('Account MongoRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an new account id on add success', async () => {
    const sut = makeSut()
    const accountId = await sut.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
    expect(accountId).toBeTruthy()
  })

  test('Should return an account on loadByEmail success', async () => {
    await accountCollection.insertOne({ name: 'any_name', email: 'any_email@mail.com', password: 'any_password' })
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('any_name')
    expect(account?.email).toBe('any_email@mail.com')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeNull()
  })

  test('Should update account accessToken on updateAccessToken success', async () => {
    const result = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const sut = makeSut()
    await sut.updateAccessToken(mongoHelper.map(result), 'any_token')
    const account = await accountCollection.findOne({ email: 'any_email@mail.com' })
    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe('any_token')
  })
})
