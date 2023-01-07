import { Collection, Db, MongoClient, InsertOneResult } from 'mongodb'

export const mongoHelper = {
  client: null as unknown as MongoClient,
  db: null as unknown as Db,
  url: null as unknown as String,
  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
    this.db = await this.client.db()
  },
  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
    this.db = null
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.url)
    }
    return this.db.collection(name)
  },
  map (mongoResult: InsertOneResult): string {
    return mongoResult.insertedId.id.toString('hex')
  }
}
