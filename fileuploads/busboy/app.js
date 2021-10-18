require('dotenv').config()
const express = require('express');
const controller = require('./controller')
const db = require('./db')



const app = express();
app
    .use(express.json())
    .get('/page/:page',controller.getAll)
    .get('/get-one/:id',controller.getOne)
    .post('/',controller.createOne)
    .use(controller.error404)
    .use(controller.error500)
    .use(express.static(__dirname + '/public'))
    .listen(process.env.port, () => {
        db.execute('select 1;').then(([data,_])=>{
            console.log('database connected');
        }).catch(err=>{
            throw(err)
        })
        console.log(`Server started on ${process.env.port}`);
});