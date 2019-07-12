import styled from 'styled-components'
import {
    LabelEl,
    InputBox,
    InputWrapperEl
} from '../../component'

const SearchUserWrapper = styled.div`
    position: relative;
    ${LabelEl} {
        display: block;
        padding: 5px 0px;
        color: #333;
    }
    ${InputBox} {
        width: 100%;
        box-sizing: border-box;
        background: transparent;
        -webkit-appearance: none;
        border: 2px solid #a9a9a9;
        border-radius: 5px;
    }
    ${InputWrapperEl} {
        padding: 8px 0px;
    }
`

export { SearchUserWrapper }