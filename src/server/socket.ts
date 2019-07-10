import { Server } from "http"
import io = require('socket.io')
import { SocketController } from './controller'

// server instance is sent after starting the server
module.exports = (server: Server) => {
    const socketIO = io(server)
    socketIO.on('connection', socket => {
        let userName: string = socket.handshake.query.userName || 'Anonymous'
        console.log(`new user connected ${userName}`)
        new SocketController(socketIO, socket, userName).socketChatEvents()
    })
}
