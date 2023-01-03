import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccountUseCase implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await new Promise((resolve) => {
      resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_mail@email.com',
        password: 'any_password'
      })
    })
  }
}
