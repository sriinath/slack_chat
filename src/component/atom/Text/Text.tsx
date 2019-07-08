import * as React from 'react'
import { TextElement } from './styled'
import { TextProps } from './typings'

const Text = (props: TextProps) => {
    const {
        text,
        isHeading,
        isLink
    } = props
    return (
        isHeading ? <TextElement as='h2' {...props}>{text}</TextElement>
        : isLink ? <TextElement as='a' {...props}>{text}</TextElement>
        : <TextElement {...props}>{text}</TextElement>
    )
}

export { Text }