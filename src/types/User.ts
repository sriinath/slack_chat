interface UserChats {
    userName: string
    chats?: ChatType[]
    groups?: GroupType[]
}
interface ChatType {
    chatId: string
    recipientUserName: string
    starred?: 'true' | 'false'
}
interface GroupType {
    chatId: string
    name: string
}

export {
    UserChats,
    ChatType,
}