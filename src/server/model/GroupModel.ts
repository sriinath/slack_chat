import { UtilModel } from './Util'
import { config } from '../config'
import { GroupChatType } from '../../types'

const {
    ChatListCollection,
    UserListCollection
} = config

class Group {
    createGroup(toFind: any, groupData: GroupChatType) {
        return UtilModel.checkDuplicateAndUpdate(ChatListCollection, toFind, groupData)
        .then(data => data)
        .catch(err => err)        
    }
    addMembersToGroup(toFind: any, toUpdate: any) {
        if(toFind && toUpdate) {
            return UtilModel.updateData(UserListCollection, toFind, toUpdate)
        }
    }
    checkGroupExists(toFind: any) {
        if(toFind) {
            return UtilModel.getData(ChatListCollection, toFind)
        }
    }
    checkMemberInGroup(toFind: any) {
        if(toFind) {
            return UtilModel.getData(UserListCollection, toFind)
        }
    }
}

const GroupModel = new Group()
export { GroupModel }