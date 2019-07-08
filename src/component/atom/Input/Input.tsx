import * as React from 'react'
import { useState } from 'react'
import { InputBox } from './styled'
import { InputProps } from './typings'

const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    return e.currentTarget.value 
}

const Input = (props: InputProps) => {
    const {
        placeholder,
        value,
        type,
        id,
        onSubmit,
        maxLength,
        minLength,
        ...remainingHandlers
    } = props
    const [ curValue, setValue ] = useState(value || '')

    return (
        <InputBox
            id={id}
            placeholder={placeholder}
            value={curValue}
            onChange={e => setValue(onInput(e))}
            type={type || 'text'}
            onSubmit={onSubmit || null}
            maxLength={maxLength}
            minLength={minLength}
            {...remainingHandlers}
        />
    )
}

export { Input }