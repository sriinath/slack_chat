import * as React from 'react'
import { ElementWithWrapperProps } from './typings'
import { ElementWrapper } from './styled'

const ElementWithWrapper: React.FC<ElementWithWrapperProps> = (props) => {
    const {
        clickHandler,
        elementProps,
        children
    } = props
    return <ElementWrapper {...elementProps} onClick={clickHandler || null}>
        {children}
    </ElementWrapper>
}

export { ElementWithWrapper }