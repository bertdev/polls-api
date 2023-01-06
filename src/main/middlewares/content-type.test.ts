import request from 'supertest'
import { app } from './../config/app'

describe('Content type middleware', () => {
  test('Should return content-type json as default', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })
})
