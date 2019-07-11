interface MainPanelProps {
    currentPage: string
    findUserChats?: (userName: string) => void
    recipientUserName?: string
}

export { MainPanelProps }