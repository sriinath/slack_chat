import * as express from 'express'
const GroupRoute = express.Router()

import { GroupController } from '../controller'

GroupRoute.post('/create', (req, res) => GroupController.createGroup(req, res))
GroupRoute.post('/addmember', (req, res) => GroupController.addMembersToGroup(req, res))

export { GroupRoute }