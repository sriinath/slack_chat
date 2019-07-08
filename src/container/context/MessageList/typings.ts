import { UserChatType } from '../../../types'

interface MessageListContextType {
    chatId: string
    length: number
    chats: Map<string, Map<string, UserChatType[]>>
}

export { MessageListContextType }