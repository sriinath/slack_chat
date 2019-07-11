import { UtilModel } from './Util'
import { Collection } from 'mongodb'
import { UserChatType } from '../../types'
import console = require('console');

class Socket {
    createAndAddUserChatId = (dbInstance: Collection, chatId: string, userName: string, data: UserChatType) => {
        const {
            recipientUserName
        } = data
        const toFind = { userName: recipientUserName }
        return UtilModel.findData(dbInstance, toFind, 10, 0)
        .then(data => {
            if(data && Array.isArray(data) && data.length) {
                const toFindSender = { userName, 'chats.recipientUserName': { $nin: [ recipientUserName ] } }
                const toUpdateSender = { $push: { 'chats': { recipientUserName, chatId } } }
                const toFindRecipient = { userName: recipientUserName, 'chats.recipientUserName': { $nin: [ userName ] } }
                const toUpdateRecipient = { $push: { 'chats': { recipientUserName: userName, chatId } } }
                const bulkOp = dbInstance.initializeUnorderedBulkOp()
                bulkOp.find( toFindSender ).update( toUpdateSender );
                bulkOp.find( toFindRecipient ).update( toUpdateRecipient )
                return bulkOp.execute()
                .then(data => {
                    return true
                })
                .catch(err => {
                    console.log(err)
                    return false
                })
            }
            else {
                return false
            }
        })
    }
}

const SocketModel = new Socket()
export { SocketModel }