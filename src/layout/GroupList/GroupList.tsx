import * as React from 'react'
import { Text, ElementWithWrapper, ListItem } from '../../component'
import { UserChatListConsumer } from '../../container'
import { AppConsumer } from '../context'
import { StyledChatWrapper } from './styled'

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
    return (
        <AppConsumer>
            {AppContext => {
                const { chatId } = AppContext
                let isActive =  false
                if(chatId && groupId && chatId === groupId) {
                    isActive = true
                }
                return <StyledChatWrapper isActive={isActive}>
                    <ElementWithWrapper
                        clickHandler={e => {
                            if(chatId !== groupId) {
                                AppContext.updateChatId(groupId)
                                AppContext.updateRecipientUserName('')
                                AppContext.currentPage !== 'group' && AppContext.updateCurrentPage('group')    
                            }
                        }}
                    >
                        <Text isHeading={false} text={groupName} />
                    </ElementWithWrapper>
                </StyledChatWrapper>
            }}
        </AppConsumer>
    )
}

export { GroupList }