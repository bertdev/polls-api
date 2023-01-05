import { Collection, Db, MongoClient } from 'mongodb'

export const mongoHelper = {
  client: null as unknown as MongoClient,
  db: null as unknown as Db,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
    this.db = await this.client.db()
  },
  async disconnect (): Promise<void> {
    await this.client.close
  },
  async getCollection (name: string): Promise<Collection> {
    return this.db.collection(name)
  }
}
