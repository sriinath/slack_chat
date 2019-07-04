import express = require('express')
const UserRoute = express.Router()

import { UserController } from '../controller'

UserRoute.post('/userlist', (req, res) => UserController.getUserList(req, res))

export { UserRoute }