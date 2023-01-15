import { LoadAccountByEmailRepository } from './../../protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../domain/models/account'
import { DbAuthentication } from './db-authentication'
import { AuthenticationModel } from '../../../domain/use-cases/authentication'
import { HashCompare } from './../../protocols/criptography/hash-compare'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRespositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
}

const makeSut = (): SutTypes => {
  const hashCompareStub = makeHashCompare()
  const loadAccountByEmailRespositoryStub = makeLoadAccountByEmailRespository()
  const sut = new DbAuthentication(loadAccountByEmailRespositoryStub, hashCompareStub)
  return {
    sut,
    loadAccountByEmailRespositoryStub,
    hashCompareStub
  }
}

const makeLoadAccountByEmailRespository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRespositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByEmailRespositoryStub()
}

const makeHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashCompareStub()
}

const makeFakeAccount = (): AccountModel => {
  return {
    id: 'account_id',
    email: 'any_email@mail.com',
    password: 'hashed_password',
    name: 'any_name'
  }
}

const makeFakeAuthentication = (): AuthenticationModel => {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRespository with correct email', async () => {
    const { sut, loadAccountByEmailRespositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRespositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Shoud throw an error if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRespositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRespositoryStub, 'load').mockRejectedValueOnce(new Error('error'))
    const promise = sut.auth(makeFakeAuthentication())
    expect(promise).rejects.toThrow(new Error('error'))
  })

  test('Shoud return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRespositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRespositoryStub, 'load').mockResolvedValueOnce(null as unknown as AccountModel)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Shoud throw an error if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockRejectedValueOnce(new Error('error'))
    const promise = sut.auth(makeFakeAuthentication())
    expect(promise).rejects.toThrow(new Error('error'))
  })
})
