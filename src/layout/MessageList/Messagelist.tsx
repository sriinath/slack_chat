import * as React from 'react'

import { Text } from '../../component'
import { MessageListConsumer } from '../../container'
import {
    MessageTitleWrapper,
    MessageBlockWrapper
} from './styled'

const MessageList = (props: any) => {
    return <MessageListConsumer>
        {context => {
            const {
                chatId,
                chats,
                length
            } = context
            let ChatMessageDOM: any = []
            chats && chats.forEach((value, key) => {
                let UserChatsDOM: any = []
                let PrevRecipientName = ''
                UserChatsDOM.push(<Text text={key} isHeading={false} key={key} />)
                value.forEach((timeValue, timeKey) => {
                    timeValue.map((chatData, chatKey) => {
                        const {
                            message,
                            recipientUserName
                        } = chatData
                        UserChatsDOM.push(<MessageBlockWrapper key={'chatmessage'+ timeKey + chatKey}>
                            {
                                PrevRecipientName !== recipientUserName ? <MessageTitleWrapper>
                                    <Text
                                        text={recipientUserName}
                                        isHeading={false}
                                        isTitle={true}
                                    />
                                    <Text
                                        text={timeKey}
                                        isHeading={false}
                                    />
                                </MessageTitleWrapper>
                                : null
                            }
                            <Text
                                text={message}
                                isHeading={false}
                            />
                        </MessageBlockWrapper>)
                        PrevRecipientName = recipientUserName
                    })
                })
                ChatMessageDOM.push(UserChatsDOM)
            })
            return <>{ChatMessageDOM}</>
        }}
    </MessageListConsumer>
}

export { MessageList }