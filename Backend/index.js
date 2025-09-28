import express from 'express';
import env from "dotenv";
import pg from 'pg';
import bcrypt from "bcrypt" 
import bodyParser from 'body-parser';         


const app = express();

env.config()

const db = new pg.Client({
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST ,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.connect();

app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.BACKEND_PORT;

app.post("/login", (req, res) => {
    console.log("hello world");
})

app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})