import { Request, Response } from 'express'
import { Util } from '../utils'
const uuidv1 = require('uuid/v1')
import { GroupModel } from '../model'
import { GroupChatType } from '../../types'
import console = require('console');

class Group {
    createGroup(req: Request, res: Response) {
        const { body } = req
        if(body) {
            const {
                groupName,
                userName
            } = body
            if(groupName && userName) {
                const groupIdentifier = uuidv1()
                const groupData: GroupChatType = {
                    groupName,
                    groupId: groupIdentifier,
                    owner: userName,
                    chats: []
                }
                const toFind = {
                    groupName
                }
                GroupModel.createGroup(toFind, groupData)
                .then(data => {
                    if(data && data.lastErrorObject) {
                        if(data.lastErrorObject.updatedExisting)
                            res.send(Util.returnResp([], 'Success', 200, 'Group already exists'))
                        else if(data.lastErrorObject.upserted)
                            res.send(Util.returnResp([], 'Success', 200, 'Group was created Successfully'))
                    }
                    else
                        res.send(Util.returnResp([], 'Failure', 200, 'Something wrong while connecting Db'))
                })
                .catch(err => {
                    console.log(err)
                    res.send(Util.returnResp([], 'Failure', 200, 'Some error in server while creating group'))
                })
            }
            else {
                res.send(Util.returnResp([], 'Failure', 200, 'Group name is mandatory field'))
            }
        }
        else {
            res.send(Util.returnResp([], 'Failure', 200, 'cannot read the user params'))
        }
    }
    addMembersToGroup(req: Request, res: Response) {
        const { body } = req
        if(body) {
            const {
                groupName,
                groupId,
                userName
            } = body
            if(groupName && userName) {
                const groupCheck = {
                    groupName,
                    groupId
                }
                const toFind = { userName }
                const toUpdate = {$push: {'groups': { groupName, groupId, isAppoved: false} } }
                GroupModel.checkGroupExists(groupCheck)
                .then(data => {
                    if(data && Array.isArray(data) && data.length) {
                        GroupModel.checkMemberInGroup(toFind)
                        .then(data => {
                            if(data && Array.isArray(data) && data.length) {
                                const userData = data[0]
                                const groupData = userData && userData.groups && userData.groups.filter((group: any) => group.groupName === groupName)
                                if(groupData.length) {
                                    res.send(Util.returnResp([], 'Failure', 200, 'User is alrady part of the group'))
                                }
                                else {
                                    GroupModel.addMembersToGroup(toFind, toUpdate)
                                    .then(data => {
                                        if(data && data.result) {
                                            if(data.result.n) {
                                                if(data.result.n && data.result.nModified) {
                                                    res.send(Util.returnResp([], 'Success', 200, 'Member Successfully added to the Group'))
                                                }
                                                else if(data.result.n && !data.result.nModified) {
                                                    res.send(Util.returnResp([], 'Failure', 200, 'Cannot add the memebr to the group at this moment'))
                                                }    
                                            }
                                            else {
                                                res.send(Util.returnResp([], 'Failure', 200, 'Cannot Find the member with userid provided'))
                                            }
                                        }
                                        else {
                                            res.send(Util.returnResp([], 'Failure', 200, 'Something wrong while connecting Db'))
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.send(Util.returnResp([], 'Failure', 200, 'Some error in server while creating group'))
                                    })    
                                }
                            }
                            else {
                                res.send(Util.returnResp([], 'Failure', 200, 'Cannot Find the member with userid provided'))
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.send(Util.returnResp([], 'Failure', 200, 'Some error in server while creating group'))
                        })
                    }
                    else {
                        res.send(Util.returnResp([], 'Failure', 200, 'Group does not exists with group id / name procided'))
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.send(Util.returnResp([], 'Failure', 200, 'Some error in server while creating group'))
                })
            }
            else {
                res.send(Util.returnResp([], 'Failure', 200, 'Group name and Group ID is mandatory field'))
            }
        }
        else {
            res.send(Util.returnResp([], 'Failure', 200, 'cannot read the user params'))
        }
    }
}

const GroupController = new Group()
export { GroupController }