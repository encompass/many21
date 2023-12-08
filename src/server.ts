import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import adminRouter from './routers/admin'
import stickerRouter from './routers/stickers'
import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'

config()
const app = express()
const PORT = 5050
const URL = process.env.ATLAS_URL as string

app.use(myLogger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/admin/', adminRouter)
app.use('/', stickerRouter)

app.use(apiErrorHandler)

mongoose
  .connect(URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log('MongoDB connection error, ', err)
  })

app.listen(PORT, () => {
  console.log('Server running http://localhost:' + PORT)
})
