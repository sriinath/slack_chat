import * as React from 'react'
import { useState } from 'react'
import { AppWrapper } from './styled'
import { LeftPanel } from '../LeftPanel'
import { MainPanel } from '../MainPanel'
import {
    MessageListContainer,
    UserChatListContainer,
    UserChatListConsumer,
    SocketProvider,
    SocketConsumer
} from '../../container'

const App = (props: any) => {
    const [ currenPage, setCurrentPage ] = useState('chat')
    const [ chatId, setChatId ] = useState('')
    const [ recipientName, setRecipientName ] = useState('')
    const [ newChat, addNewChat ] = useState(undefined)
    let params = (new URL(location.href)).searchParams
    const userName = params.get('userName')

    return  <SocketProvider url='localhost:3000' userName={userName}>
        <UserChatListContainer userName={userName} newChat={newChat}>
            <SocketConsumer>
                {socket => {
                    return <UserChatListConsumer>
                        {context => {
                            const CurUserChats = context && context.chats || []
                            const newChatId = CurUserChats.length && CurUserChats[0].chatId && CurUserChats[0].chatId.toString() || ''
                            const newRecipientName = CurUserChats.length && CurUserChats[0].recipientUserName && CurUserChats[0].recipientUserName || ''
                            if(chatId !== newChatId) {
                                socket.emit('user_chat', newRecipientName)
                                setChatId(newChatId)
                                setRecipientName(newRecipientName)
                            }
                            return <AppWrapper>
                                <LeftPanel
                                    changePageView={(pageName: string) => setCurrentPage(pageName)}
                                    setCurrentChatId={(chatid: string) => setChatId(chatid)}
                                    setRecipientName={(rName: string) => {
                                        setRecipientName(rName)
                                        socket.emit('user_chat', rName)
                                    }}
                                />
                                <MessageListContainer chatId={chatId} userName={userName}>
                                    <MainPanel
                                        userName={userName}
                                        recipientUserName={recipientName}
                                        currentPage={currenPage}
                                        findUserChats={(userName: string) => {
                                            setCurrentPage('')
                                            setRecipientName(userName)
                                            socket.emit('user_chat', userName)
                                            const userChats = CurUserChats.filter(chats => chats.recipientUserName === userName)
                                            if(userChats.length) {
                                                const userChatId = userChats[0].chatId
                                                setChatId(userChatId)
                                                addNewChat(undefined)
                                            }
                                            else {
                                                addNewChat({recipientUserName: userName})
                                            }
                                        }}
                                    />
                                </MessageListContainer>
                            </AppWrapper>
                        }}
                    </UserChatListConsumer>
                }}
            </SocketConsumer>
        </UserChatListContainer>
    </SocketProvider>
}

export { App }