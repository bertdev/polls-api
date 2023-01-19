import { Hasher } from './../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
import { HashComparer } from './../../../data/protocols/criptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash)
    return isEqual
  }
}
