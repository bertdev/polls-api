import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccountUseCase } from './db-add-account'

interface SutTypes {
  sut: DbAddAccountUseCase
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_value'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccountUseCase(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('Db Add Account Use Case', () => {
  test('Should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toBeCalledWith(accountData.password)
  })
})
