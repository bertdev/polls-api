import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => {
  return {
    async hash (data: string | Buffer, saltOrRounds: string | number): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_value'))
    },
    async compare (): Promise<boolean> {
      return true
    }
  }
})

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error() as never)
    const promise = sut.hash('any_value')
    expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct value', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return a true if compare succeeds', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return a false if compare fails', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as unknown as never)
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
})
