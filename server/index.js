import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './Models/user.model.js'

dotenv.config() //config dotenv variables
const app=express();
app.use(cors()) //cross origin allowed
app.use(express.json())  // allows json to be parsed coming as req body
const PORT=process.env.PORT

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


app.get('/',(req,resp)=>{
    resp.send("Hello world")
})


app.post('/login',async(req,resp)=>{
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
          // User found, return user object
          resp.status(200).json(user);
        }
        else {
          // User not found
          resp.status(404).json({ message: 'User not found' });
        }
      } 
      catch (error) {
        // Error handling
        resp.status(500).json({ message: error.message });
      }
})


app.post('/signup',async(req,resp)=>{
    try{
        await User.create(req.body)
        resp.send({status:'ok'})
    }
    catch{
        resp.send({status:'error'})
    }
})

app.listen(PORT,()=>{
    console.log("Server Running")
})