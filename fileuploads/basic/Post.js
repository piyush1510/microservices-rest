const db = require('./db');

class Post {
    constructor(title, dsc, file) {
        this.title=title
        this.dsc = dsc
        this.file = file
    }
    validate(){
        if(!this.title || !this.dsc) return false;
        return true;
    }
    static findOne(email){
        return db.execute(`
        select * from auth
        where
        email=?
        `,[email])
    }
    save(){
        return db.execute(`
        insert into auth
        (name, email, password, roll)
        values
        (?,?,?,?)
        `,[this.name,this.email,this.password,this.roll])
    }

}
module.exports = Post;