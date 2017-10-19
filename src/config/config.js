import dotenv from 'dotenv'

dotenv.config()

export default {
  host: process.env.NODE_ENV,
  port: process.env.PORT || 1234,
  database: {
    connection: {
      url: process.env.DB_URL
    }
  },
  bcrypt: {
    saltRounds: 10
  },
  jwt: {
    jwtSecret: 'test!@#$%test',
    refreshJwtSecret: '!@#$%refresh!@#$%',
    accessExpInMin: 2000,
    refreshExpInMin: 259200
  }
}
