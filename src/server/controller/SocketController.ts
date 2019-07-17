import {
    UserChats,
    UserChatType,
    ChatType,
    GroupType
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
        this.socket.on('send_message', async (data, recipientUserName, isGroup) => {
            let messageStatus = await this.sendMessage(data, recipientUserName, isGroup)
            if(messageStatus) {
                SocketController.socketIO.sockets.in(recipientUserName).emit('newMessage', data, messageStatus, recipientUserName)
                SocketController.socketIO.sockets.in(this.userName).emit('message_status', data, messageStatus, recipientUserName)
            }
            else
                SocketController.socketIO.sockets.in(this.userName).emit('message_status', data, messageStatus, recipientUserName)
        })
        this.socket.on('set_chats', data => this.setUserChats(data))
        this.socket.on('add_to_group', groups => this.addMemberToGroup(groups))
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
    private sendMessage = async (data: UserChatType, recipientUserName: string, isGroup?: boolean) => {
        const checkRecipient = this.userData && this.userData.chats && this.userData.chats.length ? this.userData.chats.filter(chat => chat.recipientUserName === recipientUserName) : []
        if(checkRecipient.length && checkRecipient[0] && checkRecipient[0].chatId) {
            const chatId = checkRecipient[0].chatId || ''
            let postMessageAdd = await this.addUserMessage(data, chatId, false)
            if(postMessageAdd) {
                return chatId
            }
            return ''
        }
        else if(isGroup) {
            const checkRecipient = this.userData && this.userData.groups && this.userData.groups.length ? this.userData.groups.filter(chat => chat.groupName === recipientUserName) : []
            if(checkRecipient.length && checkRecipient[0] && checkRecipient[0].groupId) {
                const chatId = checkRecipient[0].groupId || ''
                let postMessageAdd = await this.addUserMessage(data, chatId, true)
                if(postMessageAdd) {
                    return chatId
                }
                return ''
            }
        }
        else {
            const identifier = uuidv1()
            const chatId = identifier.toString()
            const createNewChat = async (dbInstance: Collection) => {
                let userChatAdd = await SocketModel.createAndAddUserChatId(dbInstance, chatId, recipientUserName, data)
                let chatMessage = await ChatController.createChatId(data, chatId)
                if(userChatAdd && chatMessage) {
                    return chatId
                }
                return '' 
            }
            UserController.getUserInstance(createNewChat)
        }
    }
    
    private addUserMessage = (data: UserChatType, chatId: string, isGroup: boolean) => {
        return ChatController.addChatMessage(data, chatId, isGroup)
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

    private addMemberToGroup = (groups: GroupType[]) => {
        if(groups && Array.isArray(groups) && groups.length) {
            this.userData.groups = groups
            groups.map(group => {
                const { groupName } = group
                if(groupName && groupName.trim().length) {
                    this.socket.join(groupName)
                }
            })
        }
    }
}

export { SocketController }