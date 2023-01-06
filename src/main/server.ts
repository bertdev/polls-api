import { mongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

mongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { app } = await import('./config/app')
    app.listen(env.port, () => {
      console.log(`server running at http://localhost:${env.port}`)
    })
  })
  .catch(console.error)
