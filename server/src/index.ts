import "reflect-metadata";
import {createConnection} from "typeorm";
import  session from 'express-session'
import {user} from "./routes/user.route";
import { register } from "./routes/auth/register.route";
import {login} from "./routes/auth/login.route";
import {addChallenge} from "./routes/challenges/challenge/add-challenge";
import {getChallenges} from "./routes/challenges/challenge/get-challenges";
import {addEntry} from "./routes/challenges/entries/add-entry";
import {removeEntry} from "./routes/challenges/entries/remove-entry";
import {removeChallenge} from "./routes/challenges/challenge/remove-challenge";
require('dotenv').config();


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const main = async () => {


    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
            __dirname + "/entity/*.ts"
        ],
        synchronize: true,
    }).then(connection => {
        console.log('Connection to database initialized.')
    }).catch(error => console.log(error));



    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));



    /* Routes */

    const pgStore = require('connect-pg-simple')(session);
    app.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    }))




    app.use(
        session({
            store: new pgStore({
                conString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB_NAME}`
            }),
            name: 'qid',
            secret: process.env.SESSION_SECRET,
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
    addEntry(app)
    removeEntry(app)
    removeChallenge(app)




    app.listen( 4000, () => {
        console.log('Server running.');
    });


}

main()