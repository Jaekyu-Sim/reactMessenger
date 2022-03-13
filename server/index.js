const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});


io.on('connection', socket=>{
    socket.on('message',({userId, message}) => {
        io.emit('message',({userId, message}))
        console.log("user ID : ", userId, ", message : ", message);
    })
})

server.listen(5000, function(){
    console.log('listening on port 5000');
})