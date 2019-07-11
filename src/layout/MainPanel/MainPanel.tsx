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
        recipientUserName
    } = props
    console.log(recipientUserName)
    switch(currentPage) {
        case 'form': return <GroupForm />
        case 'search': return <FindUser showUserMessage={findUserChats} />
        default: return <MessageList recipientUserName={recipientUserName} />
    }
}
const MainPanel = (props: MainPanelProps) => {
    return <MainWrapper>
        {renderCurrentPage(props)}
    </MainWrapper>
}

export { MainPanel }