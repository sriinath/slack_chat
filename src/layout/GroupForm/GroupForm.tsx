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
    TypeAheadWrapper,
    SearchWrapperEl
} from './styled'
import { SearchListContainer, SearchListConsumer } from '../../container'
import { useState } from 'react'

const FormSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget)
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
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ groupUsers, updateGroupUsers ] = useState([])

    console.log(searchTerm)
    return <SearchListContainer searchTerm={searchTerm}>
        <FormElement>
            <InputWrapper
                placeholder={'#channel name'}
                label='Name'
                id='channelName'
                maxLength={22}
            />
            <SearchWrapperDOM
                updateSearch={setSearchTerm}
                updateGroupUsers={updateGroupUsers}
                groupUsers={groupUsers}
            />
            <SubmitWrapper>
                <Input value='Submit' type='submit' onSubmit={FormSubmit} />
                <Input value='Cancel' type='button' onSubmit={FormSubmit} />
            </SubmitWrapper>
        </FormElement>
    </SearchListContainer>
}
const SearchWrapperDOM = (props: any) => {
    const {
        updateSearch,
        updateGroupUsers,
        groupUsers
    } = props

    return <>
        <SearchWrapperEl>
            <InputWrapper
                placeholder={'Search By Name'}
                label='Send Invites To: (Optional)'
                id='groupSearch'
                onFocus={(e: Event) => document.getElementById('typeAhead').style.display = 'block'}
                onInput={(e: React.FormEvent<HTMLInputElement>) => updateSearch(e.currentTarget.value)}
            />
            <SearchListConsumer>
            {context => {
                return <TypeAheadWrapper id='typeAhead'>
                    <ListItem
                        list={context && Array.isArray(context) && context || []}
                        Item={UserListBlock}
                        commonProps={
                            {
                                clickHandler: (userName: string) => {
                                    let updatedUser = [ ...groupUsers ]
                                    updatedUser.push({ userName })
                                    updateGroupUsers(updatedUser)
                                    document.getElementById('typeAhead').style.display = 'none'
                                }
                            }
                        }
                    />
                </TypeAheadWrapper>
            }}
            </SearchListConsumer>
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