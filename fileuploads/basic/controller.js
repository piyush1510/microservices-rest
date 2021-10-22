const Post = require("./Post");

exports.createOne = (req, res) => {
  const { title, dsc } = req.body;
  const fileName = req.fileName
  const post = new Post(title,dsc,fileName);
  if(!post.validate())return res.status(300).json('fields missing');
  post.save().then(([data,_])=>{
      res.json('post created');
  }).catch(err=>{
      res.json(err.message)
  })
  
};
exports.getOne = (req, res) => {
  Post.findOne(req.params.id).then(([data,_])=>{
    res.json(data);
  }).catch(err=>{
    res.sendStatus(404);
  })
};
exports.getAll = (req, res) => {
  res.json("get All");
};
exports.error404 = (req, res, next) => {
  res.status(404).send("404 - Not Found!");
};

exports.error500 = (err, req, res, next) => {
  res.status(500).send(err.message);
};
