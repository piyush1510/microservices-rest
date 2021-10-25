const jwt = require('jsonwebtoken');
const User = require('./User');
const Message = require('./Message')



module.exports = (io)=>{
io.on("connection", (socket) => {
    const token = socket.handshake.query.token;
    if(!token) socket.disconnect('token not available')
    var user = null;
    jwt.verify(token,process.env.secret,(err,data)=>{
        if(err) return socket.disconnect();
        user =data;
        socket.emit('hello','hello '+user.name)
        User.findByIdAndUpdate(user.id,{online:socket.id},(err,data)=>{
            if(err || !data) return socket.disconnect();
            console.log(user.name + " is online");
        })
    })
    socket.on('message',async data=>{
        const {to,messageString} = data;
        if(!to || !messageString || typeof messageString!=='string' || typeof to!=='string')
            return socket.emit('message','solething is missing')
        try {
            const toUser = await User.findById(to);
            if(!user)
                return socket.emit('message','the user was not found')
            var a=toUser.id,b=user.id;
            if(a===b)
                return socket.emit('message','cannot send to yourself')
            var swap = false;
            if(a>b){
                [a,b] = [b,a];
                swap=true;
            }
            const message = {a:a===user.id,message:messageString};
            const res=await Message.findOneAndUpdate({a,b},{$push:{messages:message}},{upsert:true}).select('a b').exec()
            socket.emit('message','message sent')
            if(toUser.online && io.sockets.sockets.has(toUser.online))
                io.to(toUser.online).emit('message',messageString)

        } catch (err) {
            console.log(err.message);
        }
    })
    socket.on('disconnect',()=>{
        User.findByIdAndUpdate(user.id,{online:''},(err,data)=>{
            if(err) return socket.disconnect();
            console.log(user.name + " is gone");
        })
    })
})
}
