import { Authentication, AuthenticationModel } from './../../../domain/use-cases/authentication'
import { LoadAccountByEmailRepository } from './../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  async auth (autentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(autentication.email)
    if (!account) {
      return null
    }
    return ''
  }
}
