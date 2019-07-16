import * as React from 'react'
import { GroupList } from '../GroupList'
import { ChatList } from '../ChatList'
import { LeftWrapper } from './styled'
import {
    IconWithText,
    ElementWithWrapper
} from '../../component'
import { LeftPanelProps } from './typings'
import { AppConsumer }  from '../context'

const LeftPanel = (props: LeftPanelProps) => {
    // const { changePageView } = props

    return <AppConsumer>
        {context => <LeftWrapper>
            <ElementWithWrapper clickHandler={e => context.updateCurrentPage('form')}>
                <IconWithText
                    text='Channels'
                    isHeading={false}
                    content="f055"
                />
            </ElementWithWrapper>
            <GroupList {...context} />
            <ElementWithWrapper clickHandler={e => context.updateCurrentPage('search')}>
                <IconWithText
                    text='Direct Message'
                    isHeading={false}
                    content='f055'
                />
            </ElementWithWrapper>
            <ChatList />
        </LeftWrapper>
        }
    </AppConsumer>
}

export { LeftPanel }