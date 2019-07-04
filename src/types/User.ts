interface UserChats {
    userName: string
    userMail?: string
    chats?: [ChatType]
    groups?: [GroupChatType]
}
interface ChatType {
    chatId: string
    recipientUserName: string
    starred?: 'true' | 'false'
}
interface GroupChatType extends ChatType {
    chatId: string
    groupName: string
    chats: [groupChat]
}
interface groupChat {
    userName: string
    accepted: boolean
    owner: string
}

export {
    UserChats,
    ChatType,
    GroupChatType
}