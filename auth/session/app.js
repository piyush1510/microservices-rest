require('dotenv').config()

const express = require('express');
const controller = require('./controller')
const db = require('./db')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({},db);

const app = express();
app
    .use(express.json())
    .use(session({
        key:process.env.sess_key,
        secret:process.env.secret,
        resave:false,
        saveUninitialized:false,
        store:sessionStore
    }))
    .post('/login',controller.login)
    .post('/register',controller.register)
    .get('/',controller.auth)
    .use(controller.error404)
    .use(controller.error500)
    .listen(process.env.port, () => {
        db.execute('select 1;').then(([data,_])=>{
            console.log('database connected');
        }).catch(err=>{
            throw(err)
        })
        console.log(`Server started on ${process.env.port}`);
});