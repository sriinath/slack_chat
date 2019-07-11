import * as React from 'react'
import { Text, ElementWithWrapper, ListItem } from '../../component'
import {
    UserChatListConsumer,
    SocketConsumer
} from '../../container'

const ChatList = (props: any) => {
    return <UserChatListConsumer>
        {context => {
            const {
                chats
            } = context
            return <ListItem
                list={chats || []}
                Item={ChatListBlock}
                commonProps={...props}
            />
        }}
    </UserChatListConsumer>
}
const ChatListBlock = (props: any) => {
    const {
        recipientUserName,
        chatId,
        setCurrentChatId,
        changePageView,
        setRecipientName
    } = props
    return (
        <SocketConsumer>
            {socket => <ElementWithWrapper
                clickHandler={e => {
                    setCurrentChatId(chatId)
                    setRecipientName(recipientUserName)
                    changePageView('chat')
                    socket.emit('user_chat', chatId)
                }}
            >
                <Text isHeading={false} text={recipientUserName} />
            </ElementWithWrapper>}
        </SocketConsumer>
    )
}

export { ChatList }