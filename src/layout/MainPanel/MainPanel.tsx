import * as React from 'react'
import { MainWrapper } from './styled'
import { MessageList } from '../MessageList'
import { MainPanelProps } from './typings'
import { GroupForm } from '../GroupForm'

const MainPanel = (props: MainPanelProps) => {
    const {
        currentPage
    } = props
    
    return <MainWrapper>
        {currentPage ? currentPage === 'form' ? <GroupForm />
        : currentPage === 'chat' ? <MessageList /> : null : null}
    </MainWrapper>
}

export { MainPanel }