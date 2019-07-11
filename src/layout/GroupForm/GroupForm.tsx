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

const FormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const inputDOM: any = document.getElementById('channelName')
    const groupName = inputDOM.value
    console.log(groupName)
    if(groupName && groupName.trim().length) {
        console.log('success')
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
            <FormElementDOM />
        </GroupFormWrapper>
}
const FormElementDOM = (props: any) => {
    const [ groupUsers, updateGroupUsers ] = useState([])

    return <FormElement onSubmit={FormSubmit}>
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
            <Input value='Cancel' type='button' />
        </SubmitWrapper>
    </FormElement>
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