import { AccountModel } from './../../domain/models/account'
import { AddAccountModel } from './../../domain/use-cases/add-acount'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
