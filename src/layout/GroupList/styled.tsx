import styled, { css } from 'styled-components'
import { StyledElementWithWrapperProps } from './typings'

const StyledChatWrapper = styled.div`
    ${(props: StyledElementWithWrapperProps) => css`
        background-color: ${props.isActive ? '#dd33dd6d' : 'transparent'};
    `}
`

export { StyledChatWrapper }