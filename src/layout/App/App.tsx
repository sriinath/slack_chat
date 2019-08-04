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
import { AppProvider, AppConsumer } from '../context'

const App = (props: any) => {
    const [ newChat, addNewChat ] = useState(undefined)
    let params = (new URL(location.href)).searchParams
    const userName = params.get('userName')
    const initialValue = {
        chatId: '',
        userName,
        recipientUserName: '',
        currentPage: 'chat',
        newChats: ['']
    }
    let updateChatID = false
    const SocketUrl = location.origin || 'localhost:3000'
    return  <SocketProvider url={SocketUrl} userName={userName}>
        <UserChatListContainer userName={userName} newChat={newChat}>
            <SocketConsumer>
                {socket => {
                    return <AppProvider {...initialValue}>
                        <AppConsumer>
                        {AppContext => <UserChatListConsumer>
                            {context => {
                                const {
                                    chatId,
                                    updateChatId,
                                    updateRecipientUserName
                                } = AppContext
                                const CurUserChats = context && context.chats || []
                                const newChatId = CurUserChats.length && CurUserChats[0].chatId && CurUserChats[0].chatId.toString() || ''
                                const newRecipientName = CurUserChats.length && CurUserChats[0].recipientUserName && CurUserChats[0].recipientUserName || ''
                                if(!updateChatID && chatId !== newChatId) {
                                    socket && socket.emit('user_chat', newRecipientName)
                                    updateChatId(newChatId)
                                    updateRecipientUserName(newRecipientName)
                                    updateChatID = true
                                }
                                return <AppWrapper>
                                    <LeftPanel
                                        // changePageView={(pageName: string) => setCurrentPage(pageName)}
                                        // setCurrentChatId={(chatid: string) => updateChatId(chatid)}
                                        // updateRecipientUserName={(rName: string) => {
                                        //     updateRecipientUserName(rName)
                                        //     socket.emit('user_chat', rName)
                                        // }}
                                    />
                                    <MessageListContainer chatId={chatId} userName={userName} isGroup={AppContext.currentPage === 'group'}>
                                        <MainPanel
                                            // userName={userName}
                                            // recipientUserName={recipientName}
                                            currentPage={AppContext.currentPage}
                                            findUserChats={(userName: string) => {
                                                updateRecipientUserName(userName)
                                                socket && socket.emit('user_chat', userName)
                                                const userChats = CurUserChats.filter(chats => chats.recipientUserName === userName)
                                                if(userChats.length) {
                                                    const userChatId = userChats[0].chatId
                                                    updateChatId(userChatId)
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
                        }
                        </AppConsumer>
                    </AppProvider>
                }}
            </SocketConsumer>
        </UserChatListContainer>
    </SocketProvider>
}

export { App }