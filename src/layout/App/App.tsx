import * as React from 'react'
import { AppWrapper } from './styled'
import { LeftPanel } from '../LeftPanel'
import { MainPanel } from '../MainPanel'
import { MessageListContainer  } from '../../container'

const App = (props: any) => {
    return <AppWrapper>
        <LeftPanel />
        <MessageListContainer check='a'>
            <MainPanel />
        </MessageListContainer>
    </AppWrapper>
}

export { App }