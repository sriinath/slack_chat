import * as React from 'react'
import { SearchUser } from '../SearchUser'
import { SearchUserWrapper } from './styled'
import { ElementWithWrapper, Text } from '../../component'

const FindUser = (props: any) => {
    const {
        showUserMessage
    } = props
    return <>
        <Text
            text='Direct Message'
            isHeading={false}
            isTitle={true}
        />
        <SearchUserWrapper>
            <SearchUser
                inputPlaceholder='Start Typing...'
                inputLabel='Search User By Name'
                ItemBlock={UserListBlock}
                listCommonProps={
                    {
                        clickHandler: (userName: string) => {
                            showUserMessage(userName)
                        }
                    }
                }
            />
        </SearchUserWrapper>
    </>
}
const UserListBlock = (props: any) => {
    const {
        userName,
        clickHandler
    } = props
    return (
        <ElementWithWrapper clickHandler={e => clickHandler(userName) || null}>
            <Text isHeading={false} text={userName} />
        </ElementWithWrapper>
    )
}

export { FindUser }