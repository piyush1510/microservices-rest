const Role = require('./role');
const jwt = require('jsonwebtoken');

exports.login =async (req,res)=>{
    const {email,password} = req.body;
    if(email && password)
    Role.findOne(email).then(async ([[user],_])=>{
        if(!user) return res.sendStatus(403)
        const match=await Role.passMatch(password,user.password)
        if(match){
            delete user.password
            console.log({...user});
            jwt.sign({...user},process.env.secret,(err,token)=>{
                console.log('yo');
                if(err) return res.sendStatus(500)
                res.json(token);
                
            })
            
        }
        else return res.sendStatus(403)
    }).catch(err=>{
        console.log(err.message);
    })
    else res.sendStatus(403)
}
exports.register = async (req,res)=>{
    const {name,email,password,roll} = req.body;
    const newRole = new Role(name,email,password,roll);
    if(!newRole.validate()) return res.sendStatus(403);
    await newRole.hash();
    newRole.save().then( _ =>{
        res.sendStatus(200)
    }).catch(err=>{
        if(err.errno && err.errno===1062) res.status(403).json({message:"user already exits"})
    })
}
exports.auth = async(req,res)=>{
    const token = req.body.token;
    if(!token) return res.sendStatus(403)
    jwt.verify(token,process.env.secret,(err,user)=>{
        if(err)return res.sendStatus(403);
        delete user.password
        res.json(user)
    })
}
exports.error500 = (err, req, res, next) =>{
    res.sendStatus(500)
}
exports.error404 = (req,res)=>{
    res.sendStatus(404)
}
