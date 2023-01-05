import { AddAccount, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccountUseCase implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<string> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const newAccountId = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hashedPassword })
    )
    return newAccountId
  }
}
