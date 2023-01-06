export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/polls-api',
  port: process.env.PORT ?? 3000
}
