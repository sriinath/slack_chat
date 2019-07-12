import { UtilModel } from './Util'
import { config } from '../config'
import { GroupChatType } from '../../types'
import { Collection } from 'mongodb';
import console = require('console');

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
            const cbk = (dbInstance: Collection) => {
                const bulkOp = dbInstance.initializeUnorderedBulkOp()
                toFind.map((query: string) => bulkOp.find( { userName: query } ).update( toUpdate ))
                return bulkOp.execute()
                .then(data => {
                    return true
                })
                .catch(err => {
                    console.log(err)
                    return false
                })
            }
            return UtilModel.connectDBCollection(UserListCollection, cbk)    
            // return UtilModel.updateData(UserListCollection, toFind, toUpdate)
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