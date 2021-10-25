const User = require('./User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.login = async(req,res)=>{
    var {email,password} = req.body;
    if(!email || !password)
        return res.sendStatus(403);
    try {
        const user = await User.findOne({email});
        if(!user)
        return res.status(404).json('user not found')
        if(!await bcrypt.compare(password,user.password))
            return res.status(403).json('password was wrong')
        jwt.sign({
            id:user.id,
            name:user.name,
            email:user.email
        },process.env.secret,(err,token)=>{
            if(err)
                return res.json(err.message)
            res.cookie('token', token).sendStatus(200);
        })
    } catch (err) {
        res.json(err.message)
    }
    
}
exports.register = async(req,res)=>{
    var {name,email,password} = req.body;
    if(!email || !password || !email)
        return res.sendStatus(403)
    
    try {
        password = await bcrypt.hash(password,10)
        const newUser = new User({name,email,password});
        await newUser.save();
        res.sendStatus(200)
    } catch (err) {
        res.send(err.message);
    }
}
exports.auth = async(req,res)=>{
    const token = req.cookies.token;
    if(!token)return res.sendStatus(403);
    jwt.verify(token,process.env.secret,(err,user)=>{
        if(err)
            return res.sendStatus(403);
        res.json(user)
    })
}
exports.error500 = (err, req, res, next) =>{
    res.sendStatus(500)
}
exports.error404 = (req,res)=>{
    res.sendStatus(404)
}