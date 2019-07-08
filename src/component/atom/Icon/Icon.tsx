import * as React from 'react'
import { IconElement } from './styled'
import { IconProps } from './typings'

const Icon = (props: IconProps) => {
    return <IconElement {...props} />
}

export { Icon }