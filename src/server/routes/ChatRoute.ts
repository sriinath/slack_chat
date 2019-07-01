import * as express from 'express'
const ChatRoute = express.Router()

import { ChatController } from '../controller'

ChatRoute.post('/chatlist',ChatController.getChatList)

export { ChatRoute }