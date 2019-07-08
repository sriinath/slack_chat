import * as React from 'react'
import { useState } from 'react'

import { AppWrapper } from './styled'
import { LeftPanel } from '../LeftPanel'
import { MainPanel } from '../MainPanel'
import { MessageListContainer  } from '../../container'

const App = (props: any) => {
    const [ chatId, setChatId ] = useState('52329')
    const [ currenPage, setCurrentPage ] = useState('chat')

    console.log(chatId)
    return <AppWrapper>
        <LeftPanel
            changePageView={(pageName: string) => setCurrentPage(pageName)}
            setCurrentChatId={(chatid: string) => setChatId(chatid)}
        />
        <MessageListContainer chatId={chatId}>
            <MainPanel currentPage={currenPage} />
        </MessageListContainer>
    </AppWrapper>
}

export { App }