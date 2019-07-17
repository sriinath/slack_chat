import { UtilModel } from './Util'
import { config } from '../config'
import { UserChatType } from '../../types';
import { Util } from '../utils';

const { ChatListCollection } = config

class Chat {
    getChatList(chatId: string, isGroup: boolean) {
        if(chatId) {
            let toFind
            if(isGroup) {
                toFind = { groupId: chatId }
            }
            else {
                toFind = { chatId }
            }
            return UtilModel.getData(ChatListCollection, toFind)
        }
    }
    createChatId(chatId: string, data: UserChatType) {
        const {
            recipientUserName,
            time,
            message
        } = data
        const toFind = { chatId }
        const toUpdate = {
            chatId,
            chats: [data]
        }
        if(time && message && recipientUserName && chatId) {
            return UtilModel.checkDuplicateAndUpdate(ChatListCollection, toFind, toUpdate)
        }
        return Promise.resolve('time, message, recipientUserName & chatId are mandatory')
    }
    addChatMessage(data: UserChatType, chatId: string, isGroup: boolean) {
        const {
            time,
            message,
            recipientUserName
        } = data
        if(time && message && recipientUserName) {
            let toFind
            if(isGroup) {
                toFind = { groupId: chatId }
            }
            else {
                toFind = { chatId }
            }
            const toUpdate = {$push: { "chats":  data }}
            if(chatId) {
                return UtilModel.updateData(ChatListCollection, toFind, toUpdate)
            }
            return Promise.resolve('Chat Id is mandatory')
        }
        else {
            return Promise.resolve('Message, Time and Recipinet User Name is mandatory')
        }
    }
}

const ChatModel = new Chat()
export { ChatModel }