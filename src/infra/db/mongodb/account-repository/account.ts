import { AddAccountRepository } from './../../../../data/protocols/add-account-repository'
import { AddAccountModel } from '../../../../domain/use-cases/add-acount'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<string> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return mongoHelper.map(result)
  }
}
