interface AppContextProps {
    currentPage: string
    userName: string
    recipientUserName: string
    chatId: string
    newChats: string[]
    
    updateChatId?: (chatId: string) => void
    updateCurrentPage?: (currentPage: string) => void
    updateRecipientUserName?: (recipientUserName: string) => void
    addNewChat?: (chatId: string) => void
}

export { AppContextProps }