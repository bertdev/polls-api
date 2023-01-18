import { AddAccount, AddAccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccountUseCase implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<string> {
    const hashedPassword = await this.hasher.hash(account.password)
    const newAccountId = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hashedPassword })
    )
    return newAccountId
  }
}
