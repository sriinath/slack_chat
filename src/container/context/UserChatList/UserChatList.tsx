import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../store/reducer'

const UserChatListContext = React.createContext({})
const { Consumer, Provider } = UserChatListContext

class UserChatListContainer extends React.Component<any> {
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
export { Consumer as ExpensesConsumer }