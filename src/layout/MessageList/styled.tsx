import styled from 'styled-components'
import {
    InputBox,
    InputWrapperEl
} from '../../component'

const MessageListCont = styled.div`
    display: flex;
    height: 100%;
    align-items: end;
`
const MessageTitleWrapper = styled.div`
    display: flex;
`
const MessageBlockWrapper = styled.div`
`
const MessageCont = styled.div`
    width: 100%;
`
const MessageSubmitCont = styled.form`
    display: flex;
    box-sizing: border-box;
    ${InputBox} {
        width: 100%;
        box-sizing: border-box;
        background: transparent;
        -webkit-appearance: none;
        border: 2px solid #a9a9a9;
        border-radius: 5px;
    }
    ${InputWrapperEl} {
        width: 85%;
    }
    ${InputBox} {
        &[type='submit'] {
            margin-left: 5px;
            width: 15%;
            min-width: 70px;
            cursor: pointer;
            &:hover {
                background-color: #2e8b57;
                color: #fff;
                border-color: #2e8b57;
            }    
        }
    }
`

export {
    MessageListCont,
    MessageTitleWrapper,
    MessageBlockWrapper,
    MessageCont,
    MessageSubmitCont
}