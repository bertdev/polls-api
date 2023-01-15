import { LoadAccountByEmailRepository } from './../../protocols/load-account-by-email-repository'
import { AccountModel } from '../../../domain/models/account'
import { DbAuthentication } from './db-authentication'

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRespository with correct email', async () => {
    class LoadAccountByEmailRespositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        return {
          id: 'account_id',
          email: 'any_email@mail.com',
          password: 'any_password',
          name: 'any_name'
        }
      }
    }
    const loadAccountByEmailRespositoryStub = new LoadAccountByEmailRespositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRespositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRespositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
