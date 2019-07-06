import styled from 'styled-components'
import {
    IconElement,
    ElementWrapper,
    IconWithTextWrapper,
    TextElement
} from '../../component'

const LeftWrapper = styled.div`
    width: 35%;
    background: #4a154b;
    color: #f5f5f5;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    ${IconElement} {
        padding-left: 5px;
        &:before {
            content: "\f055";
        }
    }
    ${IconWithTextWrapper} {
        padding: 10px;
    }
    ${ElementWrapper} {
        padding: 10px;
    }
`

export { LeftWrapper }