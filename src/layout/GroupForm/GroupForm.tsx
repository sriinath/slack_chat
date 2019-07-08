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
    const [ searchTerm, setSearchTerm ] = useState('s')
    const [ groupUsers, updateGroupUsers ] = useState([])
    const [ showTypeAhead, setTypeAhead ] = useState(true)

    return <SearchListContainer searchTerm={searchTerm}>
        <FormElement>
            <InputWrapper
                placeholder={'#channel name'}
                label='Name'
                id='channelName'
                maxLength={22}
            />
            <SearchWrapperEl>
                <InputWrapper
                    placeholder={'Search By Name'}
                    label='Send Invites To: (Optional)'
                    id='groupSearch'
                    // onFocus={(e: Event) => setTypeAhead(true)}
                    // onBlur={(e: Event) => setTypeAhead(false)}
                />
                {
                    showTypeAhead ? <SearchListConsumer>
                        {context => {
                            return <TypeAheadWrapper>
                                <ListItem
                                    list={context}
                                    Item={UserListBlock}
                                    commonProps={
                                        {
                                            clickHandler: (userName: string) => {
                                                let updatedUser = [ ...groupUsers ]
                                                updatedUser.push({ userName })
                                                console.log(updatedUser)
                                                updateGroupUsers(updatedUser)
                                            }
                                        }
                                    }
                                />
                            </TypeAheadWrapper>
                        }}
                    </SearchListConsumer> : null
                }
            </SearchWrapperEl>
            <UsersWrapper>
                <ListItem
                    list={groupUsers}
                    Item={UserListBlock}
                    commonProps={
                        {
                            iconNeeded: true,
                            clickHandler: (userName: string) => {
                                let curUserIdx = groupUsers.indexOf({ userName })
                                let updatedUserData = groupUsers.splice(curUserIdx, 1)
                                updateGroupUsers(updatedUserData)
                            }
                        }
                    }
                />
            </UsersWrapper>
            <SubmitWrapper>
                <Input value='Submit' type='submit' onSubmit={FormSubmit} />
                <Input value='Cancel' type='button' onSubmit={FormSubmit} />
            </SubmitWrapper>
        </FormElement>
    </SearchListContainer>
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