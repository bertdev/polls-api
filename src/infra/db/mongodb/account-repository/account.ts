import { AddAccountRepository } from './../../../../data/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../domain/use-cases/add-acount'
import { mongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (account: AddAccountModel): Promise<string> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return mongoHelper.map(result)
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({ email })
    return mongoHelper.mapAccount(account as AccountModel & { _id: string })
  }
}
