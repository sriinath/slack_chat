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

const uuidv1 = require('uuid/v1')
class SocketController {
    private static socketIO: io.Server
    private socket: io.Socket
    private userName: string = 'Anonymous'
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
        this.socket.on('user_chat', (chatId: string) => {
            chatId && this.socket.join(chatId)
            console.log(chatId)
        })
        this.socket.on('send_message', (data) => this.sendMessage(data))
    }
    private updateUserData = (data: ChatType) => {
        if(!this.userData.chats) {
            this.userData.chats = [data]
        }
        else {
            this.userData.chats.push(data)
        }
    }
    // when a new message is received
    private sendMessage = (data: UserChatType) => {
        const { recipientUserName } = data
        const checkRecipient = this.userData && this.userData.chats && this.userData.chats.length ? this.userData.chats.filter(chat => chat.recipientUserName === recipientUserName) : []
        if(checkRecipient.length) {
            const chatId = checkRecipient[0].chatId || ''
            this.addUserMessage(data, chatId)
        }
        else {
            console.log('New Chat User is being registered!!!')
            const identifier = uuidv1()
            const chatId = identifier.toString()
            const createNewChat = (dbInstance: Collection) => {
                let userChatAdd = SocketModel.createAndAddUserChatId(dbInstance, chatId, this.userName, data)
                this.addUserMessage(data, chatId)
                console.log(userChatAdd)
                if(userChatAdd) {
                    this.updateUserData({ recipientUserName, chatId })
                    console.log('user data updated')
                }
                this.socket.emit('new_chat', [])
            }
            UserController.getUserInstance(createNewChat)
        }
    }
    
    // this will be called from new message method
    // add a users messsage to the db
    private addUserMessage = (data: UserChatType, chatId: string) => {
        ChatController.addChatMessage(data, chatId)
        .then((data: any) => {
            console.log(data)
        })
        .catch((err: Error) => {
            console.log(err)
        })
    }
}

export { SocketController }