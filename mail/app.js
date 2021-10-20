const express = require('express');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service:"",
    // port:465,
    secure:true,
    auth:{
        user:"",
        pass:""
    }
})

const options = {
    from:"",
    to:"",
    subject:"",
    Text:""
}

transport.sendMail(options,(err,info)=>{
    if(err)console.log(err.message);
    else console.log(info.response);
})