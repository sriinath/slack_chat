import { ChatMessageListAction } from '../types'
import { UserChatType } from '../../../types'
import * as moment from 'moment'

const constructMessageList = (chatArr: UserChatType[]) => {
    let messageData = new Map()
    if(chatArr && Array.isArray(chatArr) && chatArr.length) {
        chatArr.map((chat: UserChatType) => {
            if(chat && chat.time) {
                let date = new Date(chat.time)
                let momentDate = moment(date)
                let day_key = momentDate.format('MMM Do YYYY')
                let time_key = momentDate.format('LT')
                if(messageData.get(day_key)) {
                    let dayChatData = messageData.get(day_key)
                    if(dayChatData.get(time_key)) {
                        let messageArr = dayChatData.get(time_key)
                        messageArr.push(chat)
                        dayChatData.set(time_key, messageArr)
                        messageData.set(day_key, dayChatData)
                    }
                    else {
                        let messageMap = new Map(dayChatData)
                        let messageArr = [chat]
                        messageMap.set(time_key, messageArr)
                        messageData.set(day_key, messageMap)  
                    }
                }
                else {
                    let messageMap = new Map()
                    let messageArr = [chat]
                    messageMap.set(time_key, messageArr)
                    messageData.set(day_key, messageMap)
                }
            }
        })
    }
    return messageData
}
const defaultState = {
    chatId: '',
    length: 0,
    chats: new Map()
}
const ChatMessageListReducer = (state: any = defaultState, action: ChatMessageListAction) => {
    const { type } = action
    switch(type) {
        case 'messageList': {
            const { data } = action
            const {
                chatId,
                chats,
                length
            } = data
            let chatMessageMap = constructMessageList(chats || [])
            let updatedMessageStore = {
                chats: chatMessageMap,
                chatId,
                length
            }
            return updatedMessageStore || new Map()
        }
        default:
            return state
    }
}

export { ChatMessageListReducer }