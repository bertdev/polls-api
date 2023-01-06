import request from 'supertest'
import { app } from './../config/app'

describe('Signup routes', () => {
  test('Should return an account id on succes', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'herbert',
        email: 'mailvalid@email.com',
        password: 'password',
        confirmationPassword: 'password'
      })
      .expect(200)
  })
})
