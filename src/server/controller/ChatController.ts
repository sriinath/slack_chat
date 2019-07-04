import { Request, Response } from 'express'
import { Util } from '../utils'
import { ChatModel } from '../model'
import { ChatType } from '../../types'
import { UserController } from '../controller'

class Chat {
    async getChatList(req: Request, res: Response) {
        const { body } = req
        if(body) {
            const {
                chatId,
                userName
            } = body
            if(chatId && userName) {
                const validChatId = await this.checkValidChatId(userName, chatId)
                if(validChatId) {
                    ChatModel.getChatList(chatId)
                    .then(data => {
                        res.send(Util.returnResp(data, 'Success'))
                    })
                    .catch(err => {
                        console.log(err)
                        res.send(Util.returnResp([], 'Failure', 500, 'There was some Error while retreiving data'))
                    })
                }
                else {
                    res.send(Util.returnResp([], 'Failure', 200, 'Chat Id provided doesnot exist with current user'))
                }
            }
            else {
                res.send(Util.returnResp([], 'Failure', 200, 'UserName & chatId are mandatory fields'))
            }
        }
        else {
            res.send(Util.returnResp([], 'Failure', 200, 'cannot read the user params'))
        }
    }
    private async checkValidChatId(userName: string, chatId: string) {
        if(userName && chatId) {
            const userResp = await UserController.fetchUserList(userName)
            if(userResp && userResp.status && userResp.status.toLowerCase() === 'success') {
                const { data } = userResp
                if(data && data.length) {
                    const tempUserData = data[0]
                    const checkChatId = tempUserData && tempUserData.chats && tempUserData.chats.length && tempUserData.chats.filter((item: ChatType) => item.chatId === chatId) || []
                    if(checkChatId && checkChatId.length) {
                        return true
                    }
                    return false
                }
                return false
            }
            return false
        }
        return false
    }
}

const ChatController = new Chat()
export { ChatController }