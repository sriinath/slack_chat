import styled, { css } from 'styled-components'
import {
    TextElement,
    LabelEl,
    InputBox,
    InputWrapperEl,
    ElementWrapper,
    ListWrapper
} from '../../component'

const GroupFormWrapper = styled.div`
    width: 80%;
    margin: auto;
    ${TextElement} {
        padding: 10px 0px;
        font-size: 18px;
        &:nth-child(2) {
            font-size: 16px;
            color: #666;
        }
    }
`
const SearchWrapperEl = styled.div`
    position: relative;
`
const FormElement = styled.form`
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
const SubmitWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 15px;
    ${InputBox} {
        margin-left: 15px;
        width: 25%;
        min-width: 70px;
        cursor: pointer;
        &:hover {
            background-color: #2e8b57;
            color: #fff;
            border-color: #2e8b57;
        }
    }
`
const CloseIcon = styled.div`
    font-family: FontAwesome;
    font-size: 14px;
    padding: 10px;
    cursor: pointer;
    &:before {
        content: '\f00d'
    }
`
const UsersWrapper = styled.div`
    padding-top: 10px;
    ${ListWrapper} {
        display: flex;
        flex-wrap: wrap;
        ${ElementWrapper} {
            display: flex;
            border: 1px solid #444;
            border-radius: 40px;
            align-items: center;
            margin: 5px;
            ${TextElement} {
                padding: 10px 15px;
                line-height: 18px;
                color: #333;
            }
        }
    }
`
export {
    GroupFormWrapper,
    FormElement,
    SubmitWrapper,
    CloseIcon,
    UsersWrapper,
    SearchWrapperEl
}