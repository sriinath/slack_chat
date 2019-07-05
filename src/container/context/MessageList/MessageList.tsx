import * as React from 'react'
import { Utils } from '../../../util'

import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'
import { ChatMessageListAction } from '../../store/actions'
import { DataAPI } from '../../../config'
import { MessageListContextType } from './typings'

const defaultMessageList: MessageListContextType = {
    chatId: '',
    length: 0,
    chats: new Map()
}
const MessageListContext = React.createContext(defaultMessageList)
const { Consumer, Provider } = MessageListContext
const { getChats } = DataAPI

class MessageListContainer extends React.Component<any> {
    componentDidMount() {
        Utils.fetchResponse(getChats, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'userName': 'srinath', 'chatId': '52329' })
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
    render() {
        const {
            data,
            children
        } = this.props
        console.log(data)
        return <Provider value={data}>
            {children}
        </Provider>
    }
}

const mapStateToProps = (state: AppState) => ({
    data: state.ChatMessageListReducer
})

export default connect(mapStateToProps)(MessageListContainer)
export { Consumer as MessageListConsumer }