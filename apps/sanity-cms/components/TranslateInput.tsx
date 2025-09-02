import React from 'react'
import { useFormValue } from 'sanity'
import TranslateButton from './TranslateButton'

interface TranslateInputProps {
    value?: any
    onChange: (patch: any) => void
    type?: any
}

const TranslateInput: React.FC<TranslateInputProps> = ({ onChange, type }) => {
    // Get the current document from the form context
    const document = useFormValue([]) as any

    return (
        <TranslateButton
            onChange={onChange}
            document={document}
            type={type}
        />
    )
}

export default TranslateInput
