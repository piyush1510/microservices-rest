const db = require('./db');
const bcrypt = require('bcrypt');

class Role {
    constructor(name, email, password, roll) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roll = roll;
    }
    validate(){
        if(!this.name || !this.email || !this.password || !this.roll) return false;
        return true;
    }
    async hash(){
        this.password = await bcrypt.hash(this.password,10);
    }
    static findOne(email){
        return db.execute(`
        select * from auth
        where
        email=?
        `,[email])
    }
    static async passMatch(pass,hash){
        const match = await bcrypt.compare(pass,hash)
        return match;
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
module.exports = Role;