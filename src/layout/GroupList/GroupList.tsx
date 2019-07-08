import * as React from 'react'
import { Text, ElementWithWrapper, ListItem } from '../../component'
import { UserChatListConsumer } from '../../container'

const GroupList = (props: any) => {
    return <UserChatListConsumer>
        {context => {
            const {
                groups
            } = context
            return <ListItem
                list={groups || []}
                Item={GroupListBlock}
            />
        }}
    </UserChatListConsumer>
}
const GroupListBlock = (props: any) => {
    const {
        groupName,
        groupId
    } = props
    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(groupId)
    }    
    return (
        <ElementWithWrapper
            clickHandler={clickHandler}
        >
            <Text isHeading={false} text={groupName} />
        </ElementWithWrapper>
    )
}

export { GroupList }