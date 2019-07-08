interface GroupChatType {
    groupId: string
    groupName?: string
    chats: GroupChat[]
    owner: string
}
interface GroupChat {
    message: string
    recipientName: string
    date: string
}

export {
    GroupChatType,
    GroupChat
}