import * as React from 'react'
import { MainWrapper } from './styled'
import { MessageList } from '../MessageList'

const MainPanel = (props: any) => {
    return <MainWrapper>
        <MessageList />
    </MainWrapper>
}

export { MainPanel }