import 'dotenv/config'
import express from 'express'
import * as mysql from 'mysql2'
import cors from 'cors'

//Route imports
import userRouter from './routes/user'
import clubRouter from './routes/club'
import courseRouter from './routes/course'

const app = express()
app.use(cors({ credentials: true, origin: true }))
app.use(cors({ credentials: true, origin: '*' }))
// Endpoints
app.use('/user', userRouter)
app.use('/club', clubRouter)
app.use('/course', courseRouter)

const pool = mysql.createPool({
  host: process.env.DATABASE_SERVER,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})

console.log('DATABASE_SERVER:', process.env.DATABASE_SERVER)
console.log('DATABASE_USER:', process.env.DATABASE_USER)
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD)
console.log('DATABASE_NAME:', process.env.DATABASE_NAME)

export { app, pool }
