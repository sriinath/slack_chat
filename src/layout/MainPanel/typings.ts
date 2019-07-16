interface MainPanelProps {
    currentPage: string
    recipientUserName?: string
    userName?: string
    findUserChats?: (userName: string) => void
    updateCurrentPage?: (pageName: string) => void
}

export { MainPanelProps }