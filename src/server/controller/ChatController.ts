import { Request, Response } from 'express'
import { Util } from '../utils'
import { ChatModel } from '../model'
import { ChatType } from '../../types'
import { UserController } from '../controller'
import console = require('console');

class Chat {
    async getChatList(req: Request, res: Response) {
        const { body } = req
        if(body) {
            const {
                chatId,
                userName,
                limit,
                offset
            } = body
            if(chatId && userName) {
                const validChatId = await this.checkValidChatId(userName, chatId)
                // if(validChatId) {
                    ChatModel.getChatList(chatId)
                    .then(data => {
                        console.log(data)
                        data = [{
                            chatId: '52329',
                            chats: [
                                { 
                                    recipientUserName: 'srinath',
                                    message: 'hello',
                                    time: "2019-07-05T12:07:48.891Z"
                                },
                                { 
                                    recipientUserName: 'srinath',
                                    message: 'hi',
                                    time: "2019-07-05T11:56:29.022Z" 
                                },
                                {
                                    recipientUserName: 'virat',
                                    message: 'hey',
                                    time: "2019-07-05T12:07:46.958Z"
                                },
                                {
                                    recipientUserName: 'virat',
                                    message: 'Whats up',
                                    time: "2019-07-05T12:07:44.926Z"
                                },
                                {
                                    recipientUserName: 'srinath',
                                    message: 'hello',
                                    time: "2019-07-05T11:56:25.812Z"
                                }
                            ]
                        }]
                        if(data && Array.isArray(data) && data.length) {
                            const chatInfo = data[0]
                            let chatArr = chatInfo && chatInfo.chats || []
                            let chatLength = chatArr.length
                            let chatInitcount = ((offset || 0) * (limit || 15)) + 1
                            let chatLastCount = chatInitcount + (limit || 15)
                            let respArr = []
                            if(chatInitcount <= chatLength) {
                                chatArr.sort((a: any, b: any) => {
                                    return (b && b.time && new Date(b.time).getTime()) - (a && a.time && new Date(a.time).getTime())
                                })
                                respArr = chatArr.slice(chatInitcount - 1, chatLastCount - 1)
                            }
                            let chatResp = {
                                chatId,
                                chats: respArr,
                                length: chatLength
                            }
                            res.send(Util.returnResp(chatResp, 'Success'))
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.send(Util.returnResp([], 'Failure', 500, 'There was some Error while retreiving data'))
                    })
                // }
                // else {
                //     res.send(Util.returnResp([], 'Failure', 200, 'Chat Id provided doesnot exist with current user'))
                // }
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