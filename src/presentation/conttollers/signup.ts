import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import {Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
    for (const fieldName of requiredFields) {
      if (!httpRequest.body[fieldName]) {
        return badRequest(new MissingParamError(fieldName))
      }
    }
  }
}
