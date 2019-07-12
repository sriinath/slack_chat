import * as React from 'react'
import { MainWrapper } from './styled'
import { MessageList } from '../MessageList'
import { MainPanelProps } from './typings'
import { GroupForm } from '../GroupForm'
import { FindUser } from '../FindUser'

const renderCurrentPage = (props: MainPanelProps) => {
    const {
        currentPage,
        findUserChats,
        recipientUserName,
        userName
    } = props
    switch(currentPage) {
        case 'form': return <GroupForm userName={userName} showUserMessage={findUserChats} />
        case 'search': return <FindUser showUserMessage={findUserChats} />
        default: return <MessageList recipientUserName={recipientUserName} userName={userName} />
    }
}
const MainPanel = (props: MainPanelProps) => {
    return <MainWrapper>
        {renderCurrentPage(props)}
    </MainWrapper>
}

export { MainPanel }