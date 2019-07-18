import * as React from 'react'
import { useState } from 'react'
import {
    Text,
    Input,
    InputWrapper
} from '../../component'
import { MessageListConsumer, SocketContext } from '../../container'
import {
    MessageTitleWrapper,
    MessageBlockWrapper,
    MessageListCont,
    MessageCont,
    MessageSubmitCont
} from './styled'
import { AppConsumer } from '../context'

const UserMessageWrapper = (props: any) => {
    const { socket } = props
    const [ inputValue, updateInputValue ] = useState('')
    return <MessageSubmitCont
            onSubmit={e => {
                const { recipientUserName, userName, currentPage } = props
                e.preventDefault()
                let MessageDom: any = document.getElementById('messageInput')
                let messageStoreData = {
                    recipientUserName: userName,
                    message: MessageDom.value,
                    time: new Date().toISOString()
                }
                socket && socket.emit('send_message', messageStoreData, recipientUserName, currentPage === 'group')
                updateInputValue('')
            }}
        >
            <InputWrapper
                placeholder='Jot Something Down'
                id='messageInput'
                value={inputValue}
                onChange={(e: React.FormEvent<HTMLInputElement>) => updateInputValue(e.currentTarget && e.currentTarget.value || '')}
            />
            <Input type='submit' value='SEND' />
        </MessageSubmitCont>
}

class MessageList extends React.PureComponent<any> {
    static contextType = SocketContext
    render() {
        return <AppConsumer>
        {AppContext => {
            const chatRecipientUserName = AppContext.recipientUserName
            const chatUserName = AppContext.userName
            const { currentPage } = AppContext
            return <MessageListCont>
                <MessageListConsumer>
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
                    return <MessageCont>
                        {ChatMessageDOM}
                        <UserMessageWrapper
                            socket={this.context}
                            recipientUserName={chatRecipientUserName}
                            userName={chatUserName}
                            currentPage={currentPage}
                        />
                    </MessageCont>
                }}
                </MessageListConsumer>
            </MessageListCont>
        }}
        </AppConsumer>
    }
}

export { MessageList }