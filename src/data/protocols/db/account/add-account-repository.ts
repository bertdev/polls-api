import { AddAccountModel } from './../../../../domain/use-cases/add-acount'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<string>
}
