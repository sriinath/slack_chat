import styled, { css } from 'styled-components'
import { StyledElementWithWrapperProps } from './typings'

const StyledChatWrapper = styled.div`
    ${(props: StyledElementWithWrapperProps) => css`
        background-color: ${props.isActive ? '#dd33dd6d' : 'transparent'};
        font-weight: ${props.isNew ? 'bold' : 'normal'};
        font-size: ${props.isNew ? '20px' : 'initial'};
        color: ${props.isNew ? '#fff545' : '#f5f5f5'};
    `}
`

export { StyledChatWrapper }