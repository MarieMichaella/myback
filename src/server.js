import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"

import allroutes from "./routes/allroutes.js"

mongoose.set('strictQuery', false);

//configuring dotenv
dotenv.config();

//create server instance
const app = express();

//use of corse and body parse
app.use(cors ())
app.use(bodyParser.json())


app.get("/", (req,res) => {

    res.status(200).send(`
    <h1  style="text-align: center; color: blue; 
    margin-top:20vh">Welcome to or api</h1>
    `)
})

app.use("/api/v1", allroutes)


//define variables

const port = process.env.PORT
const host = process.env.HOST

const con = () => mongoose.connect(process.env.MONGODB, {

    useNewUrlParser: true,
    useunifiedTopology: true,

});

const startServer = () => app.listen(port);

Promise.all([con(), startServer()])
  .then(() => {
    console.log(`MongoDB Connected and server listening at http://${host}:${port}`);
  })
  .catch((err) => console.log(err));








