import * as React from 'react'
import { Input } from '../../index'
import { InputWrapperProps } from './typings'
import {
    InputWrapperEl,
    LabelEl
} from './styled'

const InputWrapper = (props: any) => {
    const {
        label,
        id,
        ...inputProps
    } = props
    return <InputWrapperEl>
        <LabelEl htmlFor={id}>{label}</LabelEl>
        <Input {...inputProps} />
    </InputWrapperEl> 
}

export { InputWrapper }