import { Collection } from 'mongodb'
import { mongoHelper } from './../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('LogMongoRepository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await mongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error_stack')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
