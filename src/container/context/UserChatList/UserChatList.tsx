import * as React from 'react'
import { Utils } from '../../../util'

import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'
import { DataAPI } from '../../../config'
import { UserChatListAction } from '../../store/actions'
import { UserChats } from '../../../types'

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
        Utils.fetchResponse(getUserList, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'userName': 'srinath' })
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