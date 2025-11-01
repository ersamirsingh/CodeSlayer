import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import main from './config/db.js'
import redisClient from './config/Redis.js'
// import cors from 'cors'


app.use(express.json())
// app.use(cookieParser())


// app.use(cors({
//    origin: 'http://localhost:5173',
//    credentials: true
// }))


// app.use('/auth', authRouter)



const InitializeConnection = async ()=>{

    try {
        // console.log(process.env.PORT)

        // await Promise.all([main(), redisClient.connect()])
        // console.log('DB connected successfully.')
        await main()
        console.log('first')
        // await redisClient.connect()
        // console.log('second')

        console.log('Redis connected successfully.')
        app.listen(process.env.PORT, ()=>{
            console.log('Listening at PORT', process.env.PORT)
        })
        
    } catch (error) {

        console.log(error.message)
    }
}


InitializeConnection()



