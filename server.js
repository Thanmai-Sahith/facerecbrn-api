import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import getProfile from "./controllers/profile.js";
import updateCount from "./controllers/image.js";
import makeApiCall from "./controllers/apicall.js";
// import Client from "pg";
const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

// template : endpoints
/*
: / res = working
: /signin --> POST = success/fail
: /register --> POST = user
: /profile/:userId --> GET = user
: /image --> PUT --> user
*/

// :/
app.get('/', (req, res) => {
    res.send(db.users);
})

// :/signin
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) })

// :/register
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

// :/profile/:userId
app.get('/profile/:id', (req, res) => { getProfile(req, res, db) })

// :/image
app.put('/image', (req, res) => { updateCount(req, res, db) })

// :/imageurl
app.post('/imageurl', (req, res) => { makeApiCall(req, res) })

app.listen(process.env.PORT||3000, () => {
    console.log("App is up and running: ${process.env.PORT}");
})


