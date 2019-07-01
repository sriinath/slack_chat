import { ChatModel } from '../model'
import { Util } from '../utils'
import { Request, Response } from 'express'
import { UserChats } from '../types'

class Chat {
    getChatList(req: Request, res: Response) {
        const body: any = req.body
        const userName: string = body.userName
        if(userName) {
            return ChatModel.getChatList(userName)
            .then((data: UserChats[]) => {
                if(data && data.length) {
                    res.send(Util.returnResp(data, 'Success'))
                }
            })
            .catch((err: Error) => {
                console.log(err)
                res.send(Util.returnResp([], 'Failure', 500, 'There was some Error while retreiving data'))
            })
        }
        return Util.returnResp([], 'Failure', 200, 'User Name is mandatory')
    }
}

const ChatController = new Chat()
export { ChatController }