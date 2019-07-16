interface AppContextProps {
    currentPage: string
    userName: string
    recipientUserName: string
    chatId: string

    updateChatId?: (chatId: string) => void
    updateCurrentPage?: (currentPage: string) => void
    updateRecipientUserName?: (recipientUserName: string) => void
}

export { AppContextProps }