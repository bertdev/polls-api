import { AddAccountRepository } from './../../../../data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '../../../../domain/use-cases/add-acount'
import { mongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
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

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      {
        _id: new ObjectId(id)
      }, {
        $set: {
          accessToken
        }
      })
  }
}
