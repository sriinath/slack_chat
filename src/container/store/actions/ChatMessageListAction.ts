import { MessageList } from '../types'

const ChatMessageListAction = (action: MessageList) => {
    return {
        type: 'messageList',
        data: action
    }
}

export { ChatMessageListAction }