import { UserChats, UserChatType } from '../../types'

interface action {
    type: string
}
interface UserChatListAction extends action {
    data: UserChats
}
interface ChatMessageListAction extends action {
    data: MessageList
}
interface MessageList {
    length: number
    chatId: string
    chats: UserChatType[]
}

export {
    UserChatListAction,
    ChatMessageListAction,
    MessageList
}