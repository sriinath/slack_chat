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
    groupId: string
    groupName: string
}

export {
    UserChats,
    ChatType,
    GroupType
}