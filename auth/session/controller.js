const Role = require('./role');

exports.login =async (req,res)=>{
    const {email,password} = req.body;
    if(email && password)
    Role.findOne(email).then(async ([[user],_])=>{
        if(!user) return res.sendStatus(403)
        const match=await Role.passMatch(password,user.password)
        if(match){
            delete user.password
            req.session.user = user;
            res.sendStatus(200);
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
        res.status(403).json(err.message)
    })
}
exports.auth = async(req,res)=>{
    res.json(req.session)
}
exports.error500 = (err, req, res, next) =>{
    res.sendStatus(500)
}
exports.error404 = (req,res)=>{
    res.sendStatus(404)
}
