import * as React from 'react'
import {
    Text,
    Icon
} from '../../atom'
import { IconWithTextProps } from './typings'
import { IconWithTextWrapper } from './styled'

const IconWithText = (props: IconWithTextProps) => {
    const {
        text,
        isHeading,
        isTitle,
        ...remainingProps
    } = props
    console.log(props)
    return <IconWithTextWrapper>
        <Text text={text} isHeading={isHeading} isTitle={isTitle}/>
        <Icon {...remainingProps} />
    </IconWithTextWrapper>
}

export { IconWithText }