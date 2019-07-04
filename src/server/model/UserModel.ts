import { UtilModel } from './Util'
import { config } from '../config'
import { UserChats } from '../../types'

const { UserListCollection } = config

class User {
    getUserList(userName: string) {
        const toFind = { userName }
        return UtilModel.getData(UserListCollection, toFind)
        .then((data: UserChats[]) => {
            if(data && data.length)
                return data
            return data
        })
        .catch((err: Error) => err)
    }
}

const UserModel = new User()
export { UserModel }