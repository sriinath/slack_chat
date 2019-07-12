import * as React from 'react'
import { Utils } from '../../../util'

import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'
import { DataAPI } from '../../../config'
import { MessageListContextType } from './typings'
import { MessageList } from '../../store/types'
import { ChatMessageListAction, UpdateMessageListAction } from '../../store/actions';

import { SocketContext } from '../Socket'

const defaultMessageList: MessageListContextType = {
    chatId: '',
    length: 0,
    chats: new Map()
}
const MessageListContext = React.createContext(defaultMessageList)
const { Consumer, Provider } = MessageListContext
const { getChats } = DataAPI

class MessageListContainer extends React.PureComponent<any> {
    static contextType = SocketContext
    getUserChats() {
        const { chatId, userName } = this.props
        if(chatId && userName) {
            Utils.fetchResponse(getChats, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ userName, chatId })
            }, [])
            .then(resp => {
                if(resp) {
                    const { status } = resp
                    if(status.toLowerCase() === 'success') {
                        const { data } = resp
                        this.props.dispatch(ChatMessageListAction(data && data.data || {}))
                    }
                }
            })
            .catch(err => console.log(err))    
        }
    }
    updateMessageList(data: any, chatId: string) {
        data.chatId = chatId
        this.props.dispatch(UpdateMessageListAction(data))
    }
    componentDidMount() {
        this.context.on('newMessage', (data: any, chatId: string, recipientUserName: string) => {
            data.chatId = chatId
            this.props.dispatch(UpdateMessageListAction(data))
        })
        this.context.on('message_status', (data: any, chatId: string) => {
            data.chatId = chatId
            this.props.dispatch(UpdateMessageListAction(data))
        })
    }
    componentDidUpdate(prevProps: any) {
        const {
            chatId,
            data
        } = this.props
        const chatData = data.get(chatId)
        if(prevProps && (!prevProps.chatId || (prevProps.chatId && chatId && prevProps.chatId !== chatId)) && data) {
            if(!chatData) {
                this.getUserChats()
            }
            else {
                this.props.dispatch(ChatMessageListAction(chatData))    
            }
        }
    }
    render() {
        const {
            chatId,
            children,
            data
        } = this.props
        console.log(data)
        return <Provider value={data.get(chatId) || defaultMessageList}>
            {children}
        </Provider>
    }
}

const mapStateToProps = (state: AppState) => ({
    data: state.ChatMessageListReducer
})

export default connect(mapStateToProps)(MessageListContainer)
export { Consumer as MessageListConsumer }