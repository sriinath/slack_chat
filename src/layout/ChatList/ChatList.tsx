import * as React from 'react'
import { Text, ElementWithWrapper, ListItem } from '../../component'
import { UserChatListConsumer } from '../../container'

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
        changePageView
    } = props
    return (
        <ElementWithWrapper
            clickHandler={e => {
                setCurrentChatId(chatId)
                changePageView('chat')
            }}
        >
            <Text isHeading={false} text={recipientUserName} />
        </ElementWithWrapper>
    )
}

export { ChatList }