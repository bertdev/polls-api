import { Controller, HttpRequest, HttpResponse } from './../../protocols'
import { badRequest } from './../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }
    this.emailValidator.isValid(httpRequest.body.email)
    return {
      statusCode: 200,
      body: { ok: 'ok' }
    }
  }
}
