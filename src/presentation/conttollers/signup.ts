import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
      for (const fieldName of requiredFields) {
        if (!httpRequest.body[fieldName]) {
          return badRequest(new MissingParamError(fieldName))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      return {
        statusCode: 200,
        body: 'success'
      }
    } catch (error) {
      return serverError()
    }
  }
}
