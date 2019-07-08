import * as React from 'react'

import { MessageBlockProps } from './typings'
import {
    MessageBlockWrapper,
    MessageTitleWrapper
} from './styled'
import { Text } from '../../atom'

const MessageBlock = (props: MessageBlockProps) => {
    const {
        text,
        userName,
        showTitle,
        time
    } = props

    return <MessageBlockWrapper>
        {showTitle && <MessageTitleWrapper>
                <Text text={userName} isHeading={false} isTitle={true} />
                <Text text={time} isHeading={false} />
            </MessageTitleWrapper>
        }
        <Text text={text} isHeading={false} />
    </MessageBlockWrapper>
}

export { MessageBlock }