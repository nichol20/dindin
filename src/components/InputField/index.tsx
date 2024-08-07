import { SelectField } from './SelectField'
import styles from './style.module.scss'

interface InputFieldProps {
    name: string
    type: React.HTMLInputTypeAttribute
    inputId: string
    defaultValue?: string | number | readonly string[] | undefined
}

const InputField = ({ name, type, inputId, defaultValue }: InputFieldProps) => {
    return (
        <div className={styles.inputField}>
            <label htmlFor={inputId}>{name}</label>
            <input
                type={type}
                name={name}
                id={inputId}
                spellCheck={false}
                defaultValue={defaultValue}
            />
        </div>
    )
}

export {
    InputField,
    SelectField
}