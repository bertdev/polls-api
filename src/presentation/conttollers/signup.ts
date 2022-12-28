import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const fieldName of requiredFields) {
      if (!httpRequest.body[fieldName]) {
        return badRequest(new MissingParamError(fieldName))
      }
    }
  }
}
