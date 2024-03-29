import * as React from 'react'
import { useState } from 'react'
import { ElementWithWrapper, Text, ListItem } from '../../component'
import {
    UserChatListConsumer,
    SocketConsumer
} from '../../container'
import { AppContextProps, AppConsumer } from '../context'
import { StyledChatWrapper } from './styled'

const ChatList = (props: any) => {
    return <UserChatListConsumer>
        {context => {
            const {
                chats
            } = context
            return <ListItem
                list={chats || []}
                Item={ChatListBlock}
            />
        }}
    </UserChatListConsumer>
}
const ChatListBlock = (props: AppContextProps) => {
    const {
        recipientUserName,
        chatId
    } = props
    const [ activeChat, updateActiveChat ] = useState(false)
    const [ highlightChat, updateHighlightChat ] = useState(false)

    return (
        <SocketConsumer>
            {socket => <AppConsumer>
                {AppContext => {
                    const {
                        updateChatId,
                        updateRecipientUserName,
                        updateCurrentPage,
                        newChats
                    } = AppContext
                    if(AppContext.chatId && AppContext.chatId.trim().length) {
                        if(AppContext.chatId === chatId) {
                            updateActiveChat(true)
                        }
                        else {
                            updateActiveChat(false)
                            if(newChats.indexOf(chatId) > -1) {
                                updateHighlightChat(true)
                            }
                        }
                    }
                    else if(AppContext.recipientUserName && AppContext.recipientUserName.trim().length && AppContext.recipientUserName === recipientUserName) {
                        updateActiveChat(true)
                    }
                    else {
                        updateActiveChat(false)
                        if(newChats.indexOf(chatId) > -1) {
                            updateHighlightChat(true)
                        }
                    }
                    return <StyledChatWrapper isActive={activeChat} isNew={highlightChat}>
                        <ElementWithWrapper
                            clickHandler={e => {
                                if(AppContext.chatId !== chatId) {
                                    updateChatId(chatId)
                                    updateRecipientUserName(recipientUserName)
                                    AppContext.currentPage !== 'chat' && updateCurrentPage('chat')
                                    socket && socket.emit('user_chat', chatId)    
                                }
                            }}
                        >
                            <Text isHeading={false} text={recipientUserName} />
                        </ElementWithWrapper>
                    </StyledChatWrapper>
                }}
            </AppConsumer>}
        </SocketConsumer>
    )
}

export { ChatList }