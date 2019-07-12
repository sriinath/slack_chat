import { MessageList, UpdateMessageList } from '../types'

const ChatMessageListAction = (action: MessageList) => {
    return {
        type: 'messageList',
        data: action
    }
}
const UpdateMessageListAction = (action: UpdateMessageList) => {
    return {
        type: 'updateMessages',
        data: action
    }
}

export { ChatMessageListAction, UpdateMessageListAction }