import * as React from 'react'
import { MainWrapper } from './styled'
import { MessageList } from '../MessageList'
import { GroupForm } from '../GroupForm'
import { FindUser } from '../FindUser'

const RenderCurrentPage = (props: any) => {
    const {
        currentPage,
        findUserChats,
    } = props
    switch(currentPage) {
        case 'form': return <GroupForm showUserMessage={findUserChats} />
        case 'search': return <FindUser showUserMessage={findUserChats} />
        default: return <MessageList />
    }
}
const MainPanel = (props: any) => {
    return <MainWrapper>
        <RenderCurrentPage {...props} />
    </MainWrapper>
}

export { MainPanel }