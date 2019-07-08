import styled from 'styled-components'
import {
    IconElement,
    ElementWrapper,
    IconWithTextWrapper,
    TextElement
} from '../../component'

const LeftWrapper = styled.div`
    width: 30%;
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
    ${ElementWrapper} {
        padding: 10px;
    }
`

export { LeftWrapper }