import { UtilModel } from './Util'
import { config } from '../config'

const { ChatListCollection } = config

class Chat {
    getChatList(chatId: string) {
        if(chatId) {
            const toFind = { chatId }
            return UtilModel.getData(ChatListCollection, toFind)
        }
    }
}

const ChatModel = new Chat()
export { ChatModel }