import { Controller, HttpRequest } from './../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller): (req: Request, res: Response) => Promise<void> => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
