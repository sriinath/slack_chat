import * as React from 'react'
import { GroupList } from '../GroupList'
import { ChatList } from '../ChatList'
import { LeftWrapper } from './styled'
import {
    IconWithText,
    ElementWithWrapper
} from '../../component'
import { LeftPanelProps } from './typings'

const LeftPanel = (props: LeftPanelProps) => {
    const { changePageView } = props

    return <LeftWrapper>
        <ElementWithWrapper clickHandler={e => changePageView('form')}>
            <IconWithText
                text='Channels'
                isHeading={false}
                content="f055"
            />
        </ElementWithWrapper>
        <GroupList {...props} />
        <ElementWithWrapper clickHandler={e => changePageView('search')}>
            <IconWithText
                text='Direct Message'
                isHeading={false}
                content='f055'
            />
        </ElementWithWrapper>
        <ChatList {...props} />
    </LeftWrapper>
}

export { LeftPanel }