const express=require("express")
const{connection}=require("./db")
const{userRouter}=require("./routes/user.routes")
const{noteRouter}=require("./routes/note.route.js")
const{authenticate}=require("./middlewares/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()


const app=express()

app.use(cors({origin:"*"}))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Wellcome to homepage")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/note",noteRouter)




app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected with the database...")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`app is runing at port ${process.env.port}`) 
})