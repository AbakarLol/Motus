import express from 'express';
import env from "dotenv";
import pg from 'pg';
import bcrypt from "bcrypt"          


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

const port = process.env.BACKEND_PORT;

app.get("/login", (req, res) => {
    const user = req.body.username
    console.log(user);
})

app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})