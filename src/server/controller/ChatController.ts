import { ChatModel } from '../model'
import { Util } from '../utils'
import { Request, Response } from 'express'
import { UserChats } from '../types'
import console = require('console');

class Chat {
    getChatList(req: Request, res: Response) {
        const { body } = req
        if(body) {
            const { userName } = body
            console.log(userName)
            if(userName) {
                return ChatModel.getChatList(userName)
                .then((data: UserChats[]) => {
                    if(data){
                        if(Array.isArray(data) && data.length) {
                            res.send(Util.returnResp(data, 'Success'))
                        }
                        else {
                            res.send(Util.returnResp(data, 'Failure'))
                        }
                    }
                    else {
                        res.send(Util.returnResp([], 'Failure', 200, 'Unable to get Any Data'))
                    }
                })
                .catch((err: Error) => {
                    console.log(err)
                    res.send(Util.returnResp([], 'Failure', 500, 'There was some Error while retreiving data'))
                })
            }
            return res.send(Util.returnResp([], 'Failure', 200, 'User Name is mandatory'))
        }
        return res.send(Util.returnResp([], 'Failure', 200, 'cannot read the user params'))
    }
}

const ChatController = new Chat()
export { ChatController }