import styled, { css } from 'styled-components'
import { IconProps } from './typings'

const IconElement = styled.div`
    ${(props: IconProps) => css`
        font-family: ${props.fontFamily || 'FontAwesome'};
        font-size: ${props.fontFamily || '16px'};
        color: ${props.fontColor || '#fff'};
    `}
`

export { IconElement }