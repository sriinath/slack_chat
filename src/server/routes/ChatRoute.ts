import * as express from 'express'
const ChatRoute = express.Router()

import { ChatController } from '../controller'

ChatRoute.post('/chatlist', (req, res) => ChatController.getChatList(req, res))

export { ChatRoute }