import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin : process.env.ORIGIN_CORS,
    credentials : true,
}))

app.use(express.json({
    limit: '20kb',
}))

app.use(express.urlencoded({
    extended : true,
    limit : '20kb' 
}))

app.use(express.static('public'))

app.use(cookieParser())

/////////////////////ROUTES////////////////////////////////////

import userRoutes from './routes/User.routes.js';

app.use('/api/v1/users', userRoutes)

export {app}