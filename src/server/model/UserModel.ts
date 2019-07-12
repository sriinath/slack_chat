import { UtilModel } from './Util'
import { config } from '../config'
import { UserChats } from '../../types'

const { UserListCollection } = config

class User {
    getUserInstance(cbk: Function) {
        UtilModel.connectDBCollection(UserListCollection, cbk)
    }
    createUser(userName: string) {
        const UserData: UserChats = {
            userName,
            chats: [],
            groups: []
        }
        if(userName) {
            return UtilModel.insertData(UserListCollection, UserData)
            .then((data: any) => {
                if(data && data.insertedCount && data.insertedCount > 0) {
                    return data.ops || []
                }
                return 'There was some error while adding the user'
            })
            .catch((err: Error) => {
                console.log(err)
                return err
            })
        }
    }
    getUserList(userName: string) {
        const toFind = { userName }
        return UtilModel.getData(UserListCollection, toFind)
        .then((data: UserChats[]) => data)
        .catch((err: Error) => {
            console.log(err)
            return err
        })
    }
    searchUser(userName: string) {
        const regex = new RegExp(`^${userName}`, 'i')
        const projection = { userName : 1, _id: 0 }
        const toFind = { userName: { $regex: regex } }
        return UtilModel.getData(UserListCollection, toFind, null, null, projection)
        .then((data: UserChats[]) => {
            if(data && data.length)
                return data
            console.log(data)
            return []
        })
        .catch((err: Error) => console.log(err))
    }
}

const UserModel = new User()
export { UserModel }