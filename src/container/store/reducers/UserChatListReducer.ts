const UserChatListReducer = (state = {}, action) => {
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