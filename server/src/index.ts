import "reflect-metadata";
import {createConnection} from "typeorm";
import  session from 'express-session'
import {user} from "./routes/user.route";
import { register } from "./routes/auth/register.route";
import {login} from "./routes/auth/login.route";
import {addChallenge} from "./routes/challenges/add-challenge";
import {getChallenges} from "./routes/challenges/get-challenges";
import {addChallengeEntry} from "./routes/challenges/add-challenge-entry";


const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');

const main = async () => {


    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "easypass",
        database: "challenger",
        entities: [
            __dirname + "/entity/*.ts"
        ],
        synchronize: true,
    }).then(connection => {
        console.log('Connection to database intialized.')
    }).catch(error => console.log(error));



    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // app.get('/', (req:any , res: any) =>{
    //     console.log('re')
    // })

    /* Routes */

    const pgStore = require('connect-pg-simple')(session);
    app.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    }))


    app.use(
        session({
            store: new pgStore({
                conString: "postgres://postgres:easypass@localhost:5432/challenger"
            }),
            name: 'qid',
            secret: 'Giga secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 30,
                secure: !!process.env.production
            }
        })
    )

    register(app);
    login(app)
    user(app)
    addChallenge(app)
    getChallenges(app)
    addChallengeEntry(app)

    if(process.env.production){

    }

    //


    app.listen( 4000, () => {
        console.log('Server running.');
    });


}

main()