const express = require('express');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service:"gmail",
    // port:465,
    secure:true,
    auth:{
        user:"gmail email",
        pass:"gmail password"
    }
})

const options = {
    from:"some name",
    to:"receipent",
    subject:"---",
    text:"----"   // or html
}

transport.sendMail(options,(err,info)=>{
    if(err)console.log(err.message);
    else console.log(info.response);
})