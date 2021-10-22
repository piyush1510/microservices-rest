const db = require('./db');

class Post {
    constructor(title, dsc, file) {
        this.title=title
        this.dsc = dsc
        this.fileName = file
    }
    validate(){
        if(!this.title || !this.dsc || !this.fileName) return false;
        return true;
    }
    static findOne(id){
        return db.execute(`
        select * from posts
        where
        id=?
        `,[id])
    }
    save(){
        return db.execute(`
        insert into posts
        (title, dsc, file_name)
        values
        (?,?,?)
        `,[this.title,this.dsc,this.fileName])
    }

}
module.exports = Post;