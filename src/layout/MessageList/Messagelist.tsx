import * as React from 'react'
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

const UserMessageWrapper = (props: any) => {
    const { socket, recipientUserName } = props
    return  <MessageSubmitCont
        onSubmit={e => {
            e.preventDefault()
            console.log(recipientUserName)
            let MessageDom: any = document.getElementById('messageInput')
            let messageStoreData = {
                recipientUserName,
                message: MessageDom.value,
                time: new Date().toISOString()
            }
            socket.emit('send_message', messageStoreData)
            console.log(MessageDom.value)
            MessageDom.value=''
        }}
    >
        <InputWrapper placeholder='Jot Something Down' id='messageInput' />
        <Input type='submit' value='SEND' />
    </MessageSubmitCont>
}

class MessageList extends React.Component<any> {
    static contextType = SocketContext
    componentDidMount() {
        this.context.on('newMessage', (data: any) => console.log(data))
        this.context.on('message_status', (data: any) => console.log(data))
    }
    render() {
        const { recipientUserName } = this.props
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
                        recipientUserName={recipientUserName}
                    />
                </MessageCont>
            }}
            </MessageListConsumer>
        </MessageListCont>
    }
}

export { MessageList }