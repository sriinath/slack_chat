import Styled, { css } from 'styled-components'
import { TextProps } from './typings'

const TextElement = Styled.div`
    ${(props: TextProps) => `
        font-weight: ${props.isTitle ? 'bold': 'normal'};
        ${props.ellipsis ? css`
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        ` : ''}
    `
    }
`

export { TextElement }