import * as React from 'react'

import { ListItem } from '../../component'
import { MessageListConsumer } from '../../container'
import { UserChatType } from '../../types'

class MessageList extends React.Component {
    render() {
        return <MessageListConsumer>
            {context => {
                const {
                    chatId,
                    chats,
                    length
                } = context
                let UserChatsDOM: any = []
                chats.forEach((value, key) => {
                    UserChatsDOM.push(<div>{key}</div>)
                    value.forEach((timeValue, timeKey) => {
                        UserChatsDOM.push(<div>{timeKey}</div>)
                        timeValue.map((chatData, chatKey) => UserChatsDOM.push(<div key={'chatmessage'+ timeKey + chatKey}>{chatData.message}</div>))
                    })
                })
                return <>{UserChatsDOM}</>
            }}
        </MessageListConsumer>
    }
}

export { MessageList }