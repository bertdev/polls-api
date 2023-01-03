import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccountUseCase implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add(
      Object.assign({}, account, { password: hashedPassword })
    )
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
