import * as React from 'react'
import { Text, ElementWithWrapper, ListItem } from '../../component'
import { UserChatListConsumer } from '../../container'

const ChatList = (props: any) => {
    return <UserChatListConsumer>
        {context =>
            <ListItem
                list={context}
                Item={ChatListBlock}
            />
        }
    </UserChatListConsumer>
}
const ChatListBlock = (props: any) => {
    const {
        recipientUserName,
        chatId
    } = props
    const clickHandler = (e: Event) => {
        console.log(chatId)
    }    
    return (
        <ElementWithWrapper
            clickHandler={clickHandler}
        >
            <Text isHeading={false} text={recipientUserName} />
        </ElementWithWrapper>
    )
}
export { ChatList }