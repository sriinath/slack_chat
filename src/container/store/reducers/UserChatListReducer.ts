import { UserChatListAction } from '../types'

const UserChatListReducer = (state: any = [], action: UserChatListAction) => {
    const { type } = action
    switch(type) {
        case 'chatList': {
            return action && action.data || []
        }
        default:
            return state
    }
}

export { UserChatListReducer }