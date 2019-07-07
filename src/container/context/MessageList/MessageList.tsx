import * as React from 'react'
import { Utils } from '../../../util'

import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'
import { DataAPI } from '../../../config'
import { MessageListContextType } from './typings'
import { MessageList } from '../../store/types'
import { ChatMessageListAction } from '../../store/actions';

const defaultMessageList: MessageListContextType = {
    chatId: '',
    length: 0,
    chats: new Map()
}
const MessageListContext = React.createContext(defaultMessageList)
const { Consumer, Provider } = MessageListContext
const { getChats } = DataAPI

class MessageListContainer extends React.PureComponent<any> {
    getUserChats() {
        const { chatId } = this.props
        Utils.fetchResponse(getChats, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'userName': 'srinath', 'chatId': chatId })
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
    componentDidMount() {
        this.getUserChats()
    }
    componentDidUpdate(prevProps: any) {
        const {
            chatId,
            data
        } = this.props
        if(prevProps && prevProps.chatId && chatId && prevProps.chatId !== chatId) {
            if(data && !data.get(chatId)) {
                this.getUserChats()
                let updatedMessageList: MessageList = {
                    chats: [],
                    chatId: defaultMessageList.chatId,
                    length: defaultMessageList.length
                }
                this.props.dispatch(ChatMessageListAction(updatedMessageList))
            }
        }
    }
    render() {
        const {
            chatId,
            children,
            data
        } = this.props
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