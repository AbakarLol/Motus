import express from 'express';
import env from "dotenv";
import pg from 'pg';
import bcrypt from "bcrypt"          


const app = express();
const db = new pg.Client({
    database:'',
    port:'',
    host:"",
    user:'',
    password: ""
});

env.config()

const port = process.env.BACKEND_PORT;

app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})