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
        {label ? <LabelEl htmlFor={id}>{label}</LabelEl> : null}
        <Input {...inputProps} id={id} />
    </InputWrapperEl> 
}

export { InputWrapper }