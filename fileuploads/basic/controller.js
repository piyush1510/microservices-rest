const Post = require('./Post');

exports.createOne = (req,res)=>{
    res.json('create one');
}
exports.getOne = (req,res)=>{
    res.json('get one');
}
exports.getAll = (req,res)=>{
    res.json('get All');
}
exports.error404 = (req, res, next) =>{
    res.status(404).send('404 - Not Found!');
}

exports.error500 = (err, req, res, next) => {
    res.status(500).send('500 - Something was error!');
}
