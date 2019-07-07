import express = require('express')
const UserRoute = express.Router()

import { UserController } from '../controller'

UserRoute.post('/userlist', (req, res) => UserController.getUserList(req, res))
UserRoute.get('/search', (req, res) => UserController.searchUser(req, res))

export { UserRoute }