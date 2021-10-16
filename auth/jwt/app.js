require('dotenv').config()

const express = require('express');
const controller = require('./controller')
const db = require('./db')


const app = express();
app
    .use(express.json())
    .get('/',controller.login)
    .post('/',controller.register)
    .get('/auth',controller.auth)
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