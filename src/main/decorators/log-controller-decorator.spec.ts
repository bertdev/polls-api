import { ServerError } from '../../presentation/errors'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import { LogErrorRepository } from './../../data/protocols/db/log/log-error-repository'
import { ok, serverError } from './../../presentation/helpers/http/http-helper'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const logErrorRepositoryStub = makeLogErrorRepository()
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return { sut, controllerStub, logErrorRepositoryStub }
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise((resolve) => resolve(ok({ ok: 'ok' })))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
    }
  }
  return new LogErrorRepositoryStub()
}

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    body: {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      confirmationPassword: 'valid_password'
    }
  }
}

describe('Log Controller decorator', () => {
  test('Should call handle controller method', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeHttpRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeHttpRequest())
  })

  test('Should return same httpResponse of conttroller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(ok({ ok: 'ok' }))
  })

  test('Should call LogErrorRespository with correct error if controller returns 500', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controllerStub, 'handle')
      .mockImplementationOnce(async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        return await new Promise((resolve) => {
          return resolve(serverError(new ServerError('fake_stack')))
        })
      })
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(makeFakeHttpRequest())
    expect(logErrorSpy).toHaveBeenCalledWith('fake_stack')
  })

  test('Should call LogErrorRespository with a generic message if controller returns 500 and error has no stack', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(controllerStub, 'handle')
      .mockImplementationOnce(async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        return await new Promise((resolve) => {
          return resolve(serverError(new ServerError(undefined)))
        })
      })
    const logErrorSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    await sut.handle(makeFakeHttpRequest())
    expect(logErrorSpy).toHaveBeenCalledWith('error without stack')
  })
})
