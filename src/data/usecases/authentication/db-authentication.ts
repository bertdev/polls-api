import { Authentication, AuthenticationModel } from './../../../domain/use-cases/authentication'
import { LoadAccountByEmailRepository } from './../../protocols/db/load-account-by-email-repository'
import { HashCompare } from './../../protocols/criptography/hash-compare'
import { TokenGenerator } from './../../protocols/criptography/token-generator'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth (autentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(autentication.email)
    if (!account) {
      return null
    }
    const isValid = await this.hashCompare.compare(autentication.password, account.password)
    if (!isValid) {
      return null
    }
    await this.tokenGenerator.generate(account.id)
    return ''
  }
}
