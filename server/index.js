import express from 'express'
import cors from 'cors'
const app=express();
app.use(cors()) //cross origin allowed


app.use(express.json())  // allows json to be parsed coming as req body

app.get('/',(req,resp)=>{
    resp.send("Hello world")
})
app.post('/api/login',(req,resp)=>{
    console.log(req.body)
    resp.send("Login works")
})

app.listen('8080',()=>{
    console.log("Server Running")
})