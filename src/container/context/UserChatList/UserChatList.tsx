import * as React from 'react'
import { Utils } from '../../../util'

import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'
import { DataAPI } from '../../../config'
import { UserChatListAction } from '../../store/actions'
import { UserChats, GroupType } from '../../../types'

import { SocketContext } from '../Socket'

interface UserChatsContextTypes extends UserChats {
    updateGroup: (updateData: GroupType) => void
}
const defaultUserChatListContext: UserChatsContextTypes = {
    chats: [],
    groups: [],
    userName: '',
    updateGroup: null
}
const UserChatListContext = React.createContext(defaultUserChatListContext)
const { Consumer, Provider } = UserChatListContext

class UserChatListContainer extends React.Component<any> {
    static contextType = SocketContext
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
                            let UserInfo =  data.data && Array.isArray(data.data) && data.data.length && data.data[0] || {}
                            // const UserChats = UserInfo.length && UserInfo[0].chats || []
                            this.context && this.context.emit('set_chats', UserInfo && UserInfo.chats || [])
                            this.context && this.context.emit('add_to_group', UserInfo && UserInfo.groups || [])
                            UserInfo.updateGroup = (updateData: GroupType) => this.updateGroupData(updateData)
                            this.props.dispatch(UserChatListAction(UserInfo))
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
    updateGroupData(groupdData: GroupType) {
        const { data } = this.props
        const { groups } = data
        if(groups && Array.isArray(groups) && groups.length) {
            let checkGroupDuplication = groups.filter(group => groupdData.groupName === group.name)
            if(checkGroupDuplication && Array.isArray(checkGroupDuplication) && !checkGroupDuplication.length) {
                let updatedData = { ...data }
                let updatedGroups = [ ...groups ]
                updatedGroups.push(groupdData)
                updatedData.groups = updatedGroups
                this.props.dispatch(UserChatListAction(updatedData))
            }
        }
    }
    render() {
        const {
            data,
            children
        } = this.props
        return <Provider value={data}>
            {children}
        </Provider>
    }
}

const mapStateToProps = (state: AppState) => ({
    data: state.UserChatListReducer
})

export default connect(mapStateToProps)(UserChatListContainer)
export { Consumer as UserChatListConsumer }