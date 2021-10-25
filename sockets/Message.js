const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    messages:{
        type:Array,
        required:true
    },
    a:{
        type:String,
        reuired:true
    },
    b:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('messages',messageSchema)
