interface InputProps {
    placeholder?: string
    value?: string
    type?: string
    id?: string
    maxLength?: number
    minLength?: number
    reset?: boolean
    onSubmit?: (e: React.FormEvent<HTMLInputElement>) => void
}

export { InputProps }