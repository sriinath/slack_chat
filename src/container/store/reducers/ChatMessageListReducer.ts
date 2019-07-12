import { ChatMessageListAction } from '../types'
import { UserChatType } from '../../../types'
import * as moment from 'moment'

const constructMessageList = (chatArr: UserChatType[]) => {
    let messageData = new Map()
    if(chatArr && Array.isArray(chatArr) && chatArr.length) {
        chatArr.map((chat: UserChatType) => {
            messageData = new Map(constructMessageInfo(chat, messageData))
        })
    }
    return messageData
}
const constructMessageInfo = (chat: UserChatType, messageData: any) => {
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
    return messageData
}
const ChatMessageListReducer = (state: any = new Map(), action: any) => {
    const { type } = action
    let updatedState = new Map(state)
    switch(type) {
        case 'messageList': {
            const { data } = action
            const {
                chatId,
                chats,
                length
            } = data
            let chatMessageMap = constructMessageList(chats && chats.reverse() || [])
            let updatedMessageStore = {
                chats: chatMessageMap,
                chatId,
                length
            }
            updatedState.set(chatId, { ...updatedMessageStore })
            return updatedState
        }
        case 'updateMessages': {
            const { data } = action
            const {
                chatId,
                ...remainingData
            } = data
            if(chatId) {
                let MessageStore: any = updatedState.get(chatId) || { chats: new Map(), length: 0, chatId }
                let length = MessageStore.length || 1
                let chatMessageMap = constructMessageInfo(remainingData, MessageStore.chats)
                let updatedMessageStore = {
                    chats: chatMessageMap,
                    chatId,
                    length
                }
                console.log(chatMessageMap)
                updatedState.set(chatId, { ...updatedMessageStore })
            }
            return updatedState
        }
        default:
            return updatedState
    }
}

export { ChatMessageListReducer }