import * as Path from 'node:path'
import express from 'express'
import router from './routes/router.ts'

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

// ADD YOUR API ROUTES HERE
server.use('/api/v1/pies', router)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
