import express = require('express')
const UserRoute = express.Router()

import { UserController } from '../controller'

UserRoute.get('/get', UserController.getUserList)

export { UserRoute }