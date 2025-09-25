import express from 'express'
import env from "dotenv"
import pg from 'pg'            


const app = express();

env.config()

const port = process.env.BACKEND_PORT;

app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})