import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => {
  return {
    hash: async (data: string | Buffer, saltOrRounds: string | number): Promise<string> => {
      return await new Promise((resolve) => resolve('hashed_value'))
    }
  }
})

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return a hash on success', async () => {
    const sut = new BcryptAdapter()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })
})
