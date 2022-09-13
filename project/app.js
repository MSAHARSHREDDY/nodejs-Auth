import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./db/connectDB.js"
import router from "./routes/web.js"
const app = express()
const port=process.env.PORT

//db connection
connectDB()

///static files
app.use(express.static("public"))
app.use(express.json())
//Middleware is created when we require "req.body"
app.use(express.urlencoded({ extended:false}))

//middleware 
app.set("view engine", "ejs")

app.use("/",router)

app.listen(port,()=>{
    console.log("Listening to the port "+port)
})