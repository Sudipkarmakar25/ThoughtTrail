const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const colors=require('colors')
const dotenv =require('dotenv')
const connectDB = require('./config/db')


dotenv.config()
 const userRoutes=require('./routes/userRoutes')
 const blogRoutes=require('./routes/blogRoutes')
//mongodb connection
connectDB()

const app=express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes)
//listen

const PORT=process.env.PORT||8080
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`.bgBlue)
})