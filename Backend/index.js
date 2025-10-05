import express from 'express';
import env from "dotenv";
import pg from 'pg';
import bcrypt, { hash } from "bcrypt" 
import bodyParser from 'body-parser';    
import cors from "cors"
import passport from 'passport';   
import session from 'express-session';
import  LocalStrategy  from 'passport-local';  
import flash from 'connect-flash'


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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use(session({
    secret: 'strongSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60
    }

}))

app.use(passport.initialize())

app.use(passport.session());

const port = process.env.BACKEND_PORT;
const saltRound = parseInt(process.env.HASH_SALTROUND);



app.get("/login/failed", (req, res) => {
    console.log(req.session.messages);
})

app.get("/login/success", (req, res) => {
    console.log(req.session.messages)
})

app.post("/login", (req, res, next) => {


    // passport.authenticate('local', {
    //     failureMessage: true,
    //     failureRedirect: "/login/failed",
    //     successRedirect: '/login/success',
    //     successMessage: true
    // })

    passport.authenticate('local', (err, user, info) => {
    console.log(info); // { message: "Invalid username" }
})(req, res, next);
}
)


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


passport.use(new LocalStrategy( async function verify (username, password, done) {
    try{
        const response = await db.query("Select * from users where username = $1", [username]);
        if(response.rows.length <= 0 ){
            console.log('the username you enterred does not exist')
            return done(null, false, { message: "Le nom d'utilisateur que vous avez renseigné est inéxistent"})
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
                if(err) return done(err);
                if(result){
                    return done(null, user, { message :{
                        text : "Authentication succeed",
                        exist : true
                    }})
                    // res
                    //     .json({
                    //         message : 'Sucesss',
                    //         authSucceed : true,
                    //         userExist : true
                    //     })
                    //     .status(200)
                    console.log("Authentication succed");
                }else{
                    return done(null, false, {message:"Votre authentification a echoué reverifiez le mots de pass"})
                    // res
                    //     .json({
                    //         message : 'Votre authentification a echoué reverifiez le mots de pass',
                    //         authSucceed : false,
                    //         userExist : true
                    //     })
                    // console.log('Authentication failed');
                }
            })
        }
    }catch(error){
        return done(error)
    }

} ));


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.listen(port, ()=>{
    console.log(`Server is working ${port}`);
})