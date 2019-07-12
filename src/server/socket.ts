import { Server } from "http"
import io = require('socket.io')
import { SocketController } from './controller'

// server instance is sent after starting the server
module.exports = (server: Server) => {
    const socketIO = io(server)
    socketIO.on('connection', socket => {
        let userName: string = socket.handshake && socket.handshake.query && socket.handshake.query.userName || ''
        console.log(`new user connected ${userName}`)
        if(userName) {
            new SocketController(socketIO, socket, userName).socketChatEvents()
        }
        else {
            console.log('No valid user Name')
        }
    })
}
