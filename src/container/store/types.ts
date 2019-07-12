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
interface UpdateMessageList {
    chat: UserChatType
    chatId: string
} 
interface SearchListAction extends action {
    data: SearchListType[]
} 
interface SearchListType {
    userName: string
}

export {
    UserChatListAction,
    ChatMessageListAction,
    MessageList,
    SearchListAction,
    SearchListType,
    UpdateMessageList
}