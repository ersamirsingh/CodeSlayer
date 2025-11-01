import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import main from './config/db.js'
import redisClient from './config/Redis.js'
import cors from 'cors'
import authRouter from './Router/AuthRouter.js'
import userRouter from './Router/UserRouter.js'
import adminRouter from './Router/AdminRouter.js'


app.use(express.json())
// app.use(cookieParser())


app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)



const InitializeConnection = async ()=>{

    try {

        await Promise.all([main(), redisClient.connect()])
        console.log('DB connected successfully.')
       

        app.listen(process.env.PORT, ()=>{
            console.log('Listening at PORT', process.env.PORT)
        })
        
    } catch (error) {

        console.log(error.message)
    }
}


InitializeConnection()

