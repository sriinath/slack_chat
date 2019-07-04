import { UserChats } from '../../types'

interface UserChatListAction {
    type: string
    data: UserChats
}

export { UserChatListAction }