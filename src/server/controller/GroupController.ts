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
                userName,
                users
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
                .then(async data => {
                    if(data && data.lastErrorObject) {
                        if(data.lastErrorObject.updatedExisting)
                            res.send(Util.returnResp([], 'Success', 200, 'Group already exists'))
                        else if(data.lastErrorObject.upserted) {
                            if(users && Array.isArray(users) && users.length) {
                                res.send(await this.addUsersToGroup(groupName, users, groupIdentifier))
                            }
                        }
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
    async addMembersToGroup(req: Request, res: Response) {
        const { body } = req
        if(body) {
            const {
                groupName,
                groupId,
                users
            } = body
            res.send(await this.addUsersToGroup(groupName, users, groupId))
        }
        else {
            res.send(Util.returnResp([], 'Failure', 200, 'cannot read the user params'))
        }
    }
    addUsersToGroup(groupName:string, users: string[], groupId: string) {
        if(groupName && users && Array.isArray(users) && users.length) {
            const groupCheck = {
                groupName,
                groupId
            }
            let toFind = {userName: { $in: users } }
            const toUpdate = {$push: {'groups': { groupName, groupId, isAppoved: false} } }
            return GroupModel.checkGroupExists(groupCheck)
            .then(data => {
                if(data && Array.isArray(data) && data.length) {
                    return GroupModel.checkMemberInGroup(toFind)
                    .then(data => {
                        if(data && Array.isArray(data) && data.length) {
                            data.map((userData: any, key: number) => {
                                const groupData = userData && userData.groups && userData.groups.filter((group: any) => group.groupName === groupName)
                                if(groupData.length) {
                                    data.splice(key, 1)
                                }
                            })
                            if(!data.length) {
                                return (Util.returnResp([], 'Failure', 200, 'Users are alrady part of the group'))
                            }
                            else {
                                return GroupModel.addMembersToGroup(users, toUpdate)
                                .then(data => {
                                    if(data) {
                                        return (Util.returnResp({ ...groupCheck }, 'Success', 200, 'Member Successfully added to the Group'))
                                    }
                                    else {
                                        return (Util.returnResp([], 'Failure', 200, 'Something wrong while adding to db'))
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    return (Util.returnResp([], 'Failure', 200, 'Some error in server while creating group'))
                                })    
                            }
                        }
                        else {
                            return (Util.returnResp([], 'Failure', 200, 'Cannot Find the member with userid provided'))
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return (Util.returnResp([], 'Failure', 200, 'Some error in server while creating group'))
                    })
                }
                else {
                    return (Util.returnResp([], 'Failure', 200, 'Group does not exists with group id / name procided'))
                }
            })
            .catch(err => {
                console.log(err)
                return (Util.returnResp([], 'Failure', 200, 'Some error in server while creating group'))
            })
        }
        else {
            return (Util.returnResp([], 'Failure', 200, 'Group name and Group ID is mandatory field'))
        }
    }
}

const GroupController = new Group()
export { GroupController }