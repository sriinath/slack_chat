import * as React from 'react'
import { Utils } from '../../../util'

import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'
import { DataAPI } from '../../../config'
import { UserChatListAction } from '../../store/actions'
import { UserChats } from '../../../types'

import { SocketConsumer } from '../Socket'
const defaultUserChatListContext: UserChats = {
    chats: [],
    groups: [],
    userName: ''
}
const UserChatListContext = React.createContext(defaultUserChatListContext)
const { Consumer, Provider } = UserChatListContext

class UserChatListContainer extends React.Component<any> {
    componentDidMount() {
        const { getUserList } = DataAPI
        const { userName } = this.props
        if(userName) {
            Utils.fetchResponse(getUserList, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ userName })
            }, [])
            .then(resp => {
                if(resp) {
                    const { status } = resp
                    if(status.toLowerCase() === 'success') {
                        const { data } = resp
                        if(data && data.status && data.status.toLowerCase() === 'success') {
                            let UserInfo =  data.data || []
                            // const UserChats = UserInfo.length && UserInfo[0].chats || []
                            this.props.dispatch(UserChatListAction(UserInfo[0]))
                        }
                    }
                }
            })
            .catch(err => console.log(err))
        }
    }
    componentDidUpdate(prevProps: any) {
        const { newChat, data } = this.props
        if((prevProps.newChat && prevProps.newChat.recipientUserName !== (newChat && newChat.recipientUserName)) || (!prevProps.newChat && newChat && newChat.recipientUserName)) {
            let updatedChats = data.chats && [...data.chats] || []
            updatedChats.push(newChat)
            let updatedChatInfo = {...data}
            updatedChatInfo.chats = updatedChats
            this.props.dispatch(UserChatListAction(updatedChatInfo))
        }
    }
    render() {
        const {
            data,
            children
        } = this.props
        return <SocketConsumer>
            {socket => {
                socket.emit('set_chats', data && data.chats || [])
                return <Provider value={data}>
                    {children}
                </Provider>
            }}
        </SocketConsumer>
    }
}

const mapStateToProps = (state: AppState) => ({
    data: state.UserChatListReducer
})

export default connect(mapStateToProps)(UserChatListContainer)
export { Consumer as UserChatListConsumer }