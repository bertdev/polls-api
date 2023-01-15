import {
  LoadAccountByEmailRepository,
  AuthenticationModel,
  HashCompare,
  TokenGenerator,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'
import { AccountModel } from '../../../domain/models/account'
import { DbAuthentication } from './db-authentication'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRespositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const updateAccessTokenRepositoryStub = makeUpdateAccesstokenRepository()
  const tokenGeneratorStub = makeTokenGenerator()
  const hashCompareStub = makeHashCompare()
  const loadAccountByEmailRespositoryStub = makeLoadAccountByEmailRespository()
  const sut = new DbAuthentication(
    loadAccountByEmailRespositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRespositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
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

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return 'access_token'
    }
  }
  return new TokenGeneratorStub()
}

const makeUpdateAccesstokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (id: string, accessToken: string): Promise<void> {
    }
  }
  return new UpdateAccessTokenRepositoryStub()
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

  test('Shoud return null if HashComare returns false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('account_id')
  })

  test('Shoud throw an error if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockRejectedValueOnce(new Error('error'))
    const promise = sut.auth(makeFakeAuthentication())
    expect(promise).rejects.toThrow(new Error('error'))
  })

  test('Shoud return an access token on success', async () => {
    const { sut } = makeSut()
    const token = await sut.auth(makeFakeAuthentication())
    expect(token).toBe('access_token')
  })

  test('Should call UpdateAccesTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('account_id', 'access_token')
  })

  test('Shoud throw an error if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockRejectedValueOnce(new Error('error'))
    const promise = sut.auth(makeFakeAuthentication())
    expect(promise).rejects.toThrow(new Error('error'))
  })
})
