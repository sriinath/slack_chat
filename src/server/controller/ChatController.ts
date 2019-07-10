import { Request, Response } from 'express'
import { Util } from '../utils'
import { ChatModel } from '../model'
import { ChatType, UserChatType } from '../../types'
import { UserController } from '../controller'
const uuidv1 = require('uuid/v1')

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
                if(validChatId) {
                    ChatModel.getChatList(chatId)
                    .then(data => {
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
    createChatId(data: UserChatType, userName: string) {
        const {
            recipientUserName,
            message,
            time
        } = data
        const id = uuidv1()
        if(recipientUserName && time && message) {
            return ChatModel.createChatId(id, data)
            .then(chatResp => {
                if(chatResp && chatResp.lastErrorObject) {
                    if(chatResp.lastErrorObject.updatedExisting)
                        return ''
                    else if(chatResp.lastErrorObject.upserted)
                        return id
                }
                else
                    return ''
            })
            .catch(err => {
                console.log(err)
                return ''
            })
        }
        return Promise.resolve('Please provide all mandatory fields')
    }
    addChatMessage(data: UserChatType, chatId: string) {
        const {
            recipientUserName,
            time,
            message
        } = data
        if(chatId && recipientUserName && message && time) {
            return ChatModel.addChatMessage(data, chatId)
        }
        return Promise.resolve('Please provide all mandatory fields')
    }
}

const ChatController = new Chat()
export { ChatController }