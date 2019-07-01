interface ChatList {
    owner: string
	name: string
    chatId: string
    chats: [UserChatType]
}
interface UserChatType {
    chatId?: string
    recipientUserName: string
    message: string
    date: Date
    time: TimeRanges
}

export {
    ChatList,
    UserChatType,
}