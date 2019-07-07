import { UserModel } from '../model'
import { Util } from '../utils'
import { Request, Response } from 'express'
import { UserChats } from '../../types'

class User {
    getUserList(req: Request, res: Response) {
        const { body } = req
        if(body) {
            const { userName } = body
            console.log(userName)
            this.fetchUserList(userName)
            .then(userResp => res.send(userResp))
            .catch(err => {
                console.log(err)
                res.send(Util.returnResp([], 'Failure', 500, 'There was some Error while retreiving data'))
            })
        }
        else {
            res.send(Util.returnResp([], 'Failure', 200, 'cannot read the user params'))
        }
    }
    fetchUserList(userName: string) {
        if(userName) {
            return UserModel.getUserList(userName)
            .then((data: UserChats[]) => {
                if(data){
                    if(Array.isArray(data) && data.length) {
                        return Util.returnResp(data, 'Success')
                    }
                    else {
                        return Util.returnResp(data, 'Failure')
                    }
                }
                else {
                    return Util.returnResp([], 'Failure', 200, 'Unable to get Any Data')
                }
            })
            .catch((err: Error) => {
                console.log(err)
                return Util.returnResp([], 'Failure', 500, 'There was some Error while retreiving data')
            })
        }
        return Promise.resolve(Util.returnResp([], 'Failure', 200, 'User Name is mandatory'))
    }
    searchUser(req: Request, res: Response) {
        const { query } = req
        if(query) {
            const { searchTerm } = query
            if(searchTerm) {
                UserModel.searchUser(searchTerm)
                .then(userResp => res.send(Util.returnResp(userResp, 'Success')))
                .catch(err => {
                    console.log(err)
                    res.send(Util.returnResp([], 'Failure', 500, 'There was some Error while retreiving data'))
                })
            }
            else {
                res.send(Util.returnResp([], 'Failure', 200, 'Search Term is mandatory'))
            }
        }
        else {
            res.send(Util.returnResp([], 'Failure', 200, 'cannot read the user params'))
        }
    }
}

const UserController = new User()
export { UserController }