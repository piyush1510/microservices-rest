const Post = require("./Post");
const Busboy = require("busboy");
const path = require('path');
const os = require('os');
const fs = require('fs');

exports.createOne = async(req, res) => {
  // will all fields to this body
  var body = {};
  //init the read stream
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file",(fieldname, file, filename, encoding, mimetype) => {
    // check for mimetypes
    
    const fileName = 'img_'+Date.now()+path.extname(filename)
    body.img=fileName
    var saveTo = path.join(os.tmpdir(), filename);
    
    file.pipe(fs.createWriteStream(saveTo));
    file.on("end", async() => {
      var publicPath = path.join(__dirname,'public',fileName)
      var rStream = fs.createReadStream(saveTo);
      var wstream = fs.createWriteStream(publicPath);
      rStream.pipe(wstream);
      rStream.on('end',()=>{
        // waiting for unlinking is not necessary
        fs.unlink(saveTo,err=>{})
      })
    });
  });
  busboy.on(
    "field",
    (fieldName, val, fieldNameTruncated, valTruncated, encoding, mimetype) => {
      body[fieldName] = val;
    }
  );
  busboy.on("finish", async() => {
    // store in dp
    const post = new Post(body.title,body.dsc,body.img);
    post.save().then(([data,_])=>{
      res.json('saved')
    }).catch(err=>{
      console.log(err.message);
    })
  });
  //piping the req multipart data to busboy
  req.pipe(busboy);
};
exports.getOne = (req, res) => {
  res.json("get one");
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
