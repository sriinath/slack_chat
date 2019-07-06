import * as React from 'react'
import { GroupList } from '../GroupList'
import { ChatList } from '../ChatList'
import { LeftWrapper } from './styled'
import { IconWithText } from '../../component'

const LeftPanel = (props: any) => {
    return <LeftWrapper>
        <IconWithText
            text='Channels'
            isHeading={false}
            isTitle={true}
            content="f055"
        />
        <GroupList />
        <IconWithText
            text='Direct Message'
            isHeading={false}
            isTitle={true}
            content='f055'
        />
        <ChatList />
    </LeftWrapper>
}

export { LeftPanel }