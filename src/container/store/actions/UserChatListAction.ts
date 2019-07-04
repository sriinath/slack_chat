import { ChatType } from '../../../types'

const UserChatListAction = (action: ChatType[]) => {
    return {
        type: 'chatList',
        data: action
    }
}

export { UserChatListAction }