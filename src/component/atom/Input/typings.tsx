interface InputProps {
    placeholder?: string
    value?: string
    type?: string
    id?: string
    maxLength?: number
    minLength?: number

    onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void
}

export { InputProps }