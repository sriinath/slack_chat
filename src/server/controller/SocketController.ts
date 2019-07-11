import {
    UserChats,
    UserChatType,
    ChatType
} from "../../types"
import io = require('socket.io')

import {
    ChatController,
    UserController
} from './index'
import { SocketModel } from '../model'
import { Collection } from "mongodb"
import console = require("console");

const uuidv1 = require('uuid/v1')
class SocketController {
    private static socketIO: io.Server
    private socket: io.Socket
    private userName: string = ''
    private userData: UserChats = {
        userName: this.userName
    }
    constructor(socketIO:io.Server, socket: io.Socket, userName: string) {
        SocketController.socketIO = socketIO
        this.socket = socket
        this.userName = userName
    }
    socketChatEvents = () => {
        // when user adds a new chat
        // this.socket.on('user_chat', (recipientName: string) => {
        //     recipientName && this.socket.join(recipientName)
        //     console.log(recipientName)
        // })
        this.socket.join(this.userName)
        this.socket.on('send_message', (data) => {
            this.sendMessage(data)
            SocketController.socketIO.sockets.in(this.userName).emit('newMessage', data.message)
        })
        this.socket.on('set_chats', data => this.setUserChats(data))
    }
    private setUserChats = (data: ChatType[]) => {
        this.userData.chats = data
    }
    private updateUserData = (data: ChatType) => {
        console.log(data)
        if(!this.userData.chats) {
            this.userData.chats = [data]
        }
        else {
            this.userData.chats.push(data)
        }
    }
    private sendMessage = (data: UserChatType) => {
        const { recipientUserName } = data
        const checkRecipient = this.userData && this.userData.chats && this.userData.chats.length ? this.userData.chats.filter(chat => chat.recipientUserName === recipientUserName) : []
        if(checkRecipient.length && checkRecipient[0] && checkRecipient[0].chatId) {
            const chatId = checkRecipient[0].chatId || ''
            let postMessageAdd = this.addUserMessage(data, chatId)
            if(postMessageAdd) {
                this.socket.emit('message_status', 'successfully added the message')
            }
            else {
                this.socket.emit('message_status', 'failed to add the message')
            }
        }
        else {
            const identifier = uuidv1()
            const chatId = identifier.toString()
            const createNewChat = async (dbInstance: Collection) => {
                let userChatAdd = await SocketModel.createAndAddUserChatId(dbInstance, chatId, this.userName, data)
                let chatMessage = await ChatController.createChatId(data, chatId)
                if(userChatAdd && chatMessage) {
                    this.socket.emit('message_status', 'successfully added the message')
                }
                else {
                    this.socket.emit('message_status', 'failed to add the message')    
                }
            }
            UserController.getUserInstance(createNewChat)
        }
    }
    
    private addUserMessage = (data: UserChatType, chatId: string) => {
        return ChatController.addChatMessage(data, chatId)
        .then((data: any) => {
            if(data && data.modifiedCount) 
                return true
            return false
        })
        .catch((err: Error) => {
            console.log(err)
            return false
        })
    }
}

export { SocketController }