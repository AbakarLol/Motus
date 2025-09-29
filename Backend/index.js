import express from 'express';
import env from "dotenv";
import pg from 'pg';
import bcrypt from "bcrypt" 
import bodyParser from 'body-parser';    
import cors from "cors"     


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


app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

const port = process.env.BACKEND_PORT;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post("/login",  async (req, res) => {
    const {username, password} =  req.body;
    try{
        const response = await db.query("Select * from users where username = $1", [username]);
        if(response.rows.length <= 0 ){
            console.log('the username you enterred does not exist')
        }else{
            console.log(response.rows[0])
        }
    }catch(error){
        console.log(error)
    }
})

app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})