import * as React from 'react'
import {
    Text,
    InputWrapper,
    Input,
    ListItem,
    ElementWithWrapper
} from '../../component'
import {
    FormElement,
    GroupFormWrapper,
    SubmitWrapper,
    CloseIcon,
    UsersWrapper,
    SearchWrapperEl
} from './styled'
import { SearchUser } from '../SearchUser'
import { useState } from 'react'
import { DataAPI } from '../../config'
import { Utils } from '../../util'
import { UserChatListConsumer } from '../../container'
import { AppConsumer, AppContextProps } from '../context'

const FormSubmit = (users: {userName: string}[], context: AppContextProps, updateGroup: any) => {
    const inputDOM: any = document.getElementById('channelName')
    const groupName = inputDOM.value
    const { userName } = context
    if(groupName && groupName.trim().length) {
        let postBody: any = {
            groupName,
            userName,
            users: [userName]
        }
        const { createGroup } = DataAPI
        if(users.length) {
            users.map(user => postBody.users.push(user.userName))
        }
        Utils.fetchResponse(createGroup, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postBody)
        }, [])
        .then(data => {
            if(data && data.status && data.status.toLowerCase() === 'success') {
                const groupId = data.data && data.data.data && data.data.data.groupId || ''
                updateGroup && updateGroup({ groupName, groupId })
                const {
                    updateChatId,
                    updateRecipientUserName,
                    updateCurrentPage,
                    currentPage
                } = context
                updateChatId(groupId)
                updateRecipientUserName('')
                currentPage !== 'group' && updateCurrentPage('group')
            }
            else {
                console.log('there was some error while creating group')
            }
        })
        .catch(err => console.log(err))
    }
    else {
        console.log('failure')
    }
}
const GroupForm = (props: any) => {
    return <GroupFormWrapper>
            <Text
                text={'Create a Channel'}
                isHeading={false}
                isTitle={true}
            />
            <Text
                text={"Channels are where your members communicate. They're best when organized around a topic."}
                isHeading={false}
            />
            <FormElementDOM {...props} />
        </GroupFormWrapper>
}
const FormElementDOM = (props: any) => {
    // const { userName } = props
    const [ groupUsers, updateGroupUsers ] = useState([])

    return <UserChatListConsumer>
        {context => {
            const { updateGroup } = context
            return <AppConsumer>
                {AppContext => <FormElement onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault()
                        FormSubmit(groupUsers, AppContext, updateGroup)
                    }}>
                    <InputWrapper
                        placeholder={'#channel name'}
                        label='Name'
                        id='channelName'
                        maxLength={22}
                    />
                    <SearchWrapperDOM
                        updateGroupUsers={updateGroupUsers}
                        groupUsers={groupUsers}
                    />
                    <SubmitWrapper>
                        <Input value='Submit' type='submit' />
                        {/* <Input value='Cancel' type='button' /> */}
                    </SubmitWrapper>
                </FormElement>
                }
            </AppConsumer>
        }}
    </UserChatListConsumer>
}
const SearchWrapperDOM = (props: any) => {
    const {
        updateGroupUsers,
        groupUsers
    } = props
    return <>
        <SearchWrapperEl>
            <SearchUser
                inputPlaceholder={'Search By Name'}
                inputLabel={'Send Invites To: (Optional)'}
                ItemBlock={UserListBlock}
                listCommonProps={
                    {
                        clickHandler: (userName: string) => {
                            let updatedUser = [ ...groupUsers ]
                            if(!updatedUser.some(user => user.userName === userName)) {
                                updatedUser.push({ userName })
                                updateGroupUsers(updatedUser)
                            }
                            document.getElementById('typeAhead').style.display = 'none'
                        }
                    }
                }
            />
        </SearchWrapperEl>
        <UsersWrapper>
        <ListItem
            list={groupUsers}
            Item={UserListBlock}
            commonProps={
                {
                    iconNeeded: true,
                    clickHandler: (userName: string) => {
                        let updatedUserData = groupUsers.filter((user: any) => user.userName !== userName)
                        updateGroupUsers(updatedUserData)
                    }
                }
            }
        />
        </UsersWrapper>
    </>
}
const UserListBlock = (props: any) => {
    const {
        userName,
        clickHandler,
        iconNeeded
    } = props
    return (
        <ElementWithWrapper clickHandler={e => !iconNeeded && clickHandler(userName) || null}>
            <Text isHeading={false} text={userName} />
            {iconNeeded ? <CloseIcon onClick={e => clickHandler(userName)} /> : null}
        </ElementWithWrapper>
    )
}

export { GroupForm }