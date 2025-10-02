import express from 'express';
import env from "dotenv";
import pg from 'pg';
import bcrypt, { hash } from "bcrypt" 
import bodyParser from 'body-parser';    
import cors from "cors"
import passport from 'passport';   
import session from 'express-session';
import { Strategy } from 'passport-local';  


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


app.use(session({
    secret: 'strongSecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 1000*60*60
    }

}))

app.use(passport.session());

const port = process.env.BACKEND_PORT;
const saltRound = parseInt(process.env.HASH_SALTROUND);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post("/login",  
    passport.authenticate('local', {faillureRedirect: '/login'}),
    (req, res) => {
    const {username, password} =  req.body;
    console.log(req.user)
});


app.post("/signup", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, saltRound, async (err, hash) => {
        if(err) console.log(err);
        try {
            const response = await db.query('Insert into users (username, password) values ($1, $2) Returning *', [username, hash]);
            console.log(response.rows[0])
        } catch (error) {
            console.log(error)
        }

    })
    
})


passport.use(new Strategy( async function verify (username, password, cb) {
    try{
        const response = await db.query("Select * from users where username = $1", [username]);
        if(response.rows.length <= 0 ){
            console.log('the username you enterred does not exist')
            cb(null, false, {message:"No username"})
            // res
            //     .json({
            //         message : "Le nom d'utilisateur que vous avez renseigné est inéxistent",
            //         authSucceed : false,
            //         userExist : false
                    
            //     })
            //     .status(200)
        }else{
            const user = response.rows[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) console.log(err);
                if(result){
                    cb(null, user, {message:"Authentication succeed"})
                    // res
                    //     .json({
                    //         message : 'Sucesss',
                    //         authSucceed : true,
                    //         userExist : true
                    //     })
                    //     .status(200)
                    console.log("Authentication succed");
                }else{
                    cb(null, false, {message:"Authentication failed"})
                    // res
                    //     .json({
                    //         message : 'Votre authentification a echoué reverifiez le mots de pass',
                    //         authSucceed : false,
                    //         userExist : true
                    //     })
                    console.log('Authentication failed');
                }
            })
        }
    }catch(error){
        cb(error)
        console.log(error)
    }

} ));


passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})

app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})