import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRoutes from "./routes/users.js"
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answer.js'


const app=express()
dotenv.config()

app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors());

app.get('/',(req,res)=>{
    res.send("This is a Stacl Overflow Clone API")
})

app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answer',answerRoutes)

const PORT=process.env.PORT||5000

const CONNECTION_URL=process.env.DATABASE_CONNECTION_URL


mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
   .then(()=>app.listen(PORT,()=>{console.log(`sever is running on Port ${PORT}`)}))
   .catch((err)=> console.log(err.message))


// connection string"mongodb+srv://admin:<password>@stack-overflow-clone.urpnqcd.mongodb.net/"