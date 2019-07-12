interface MainPanelProps {
    currentPage: string
    findUserChats?: (userName: string) => void
    recipientUserName?: string
    userName?: string
}

export { MainPanelProps }