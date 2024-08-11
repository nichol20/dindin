import { SelectField } from './SelectField'
import styles from './style.module.scss'

interface InputFieldProps {
    title: string
    name: string
    type: React.HTMLInputTypeAttribute
    inputId: string
    defaultValue?: string | number | readonly string[]
    prefix?: string
    min?: string | number
    step?: string | number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputField = ({ title, name, type, inputId, defaultValue, prefix, min, step, onChange }: InputFieldProps) => {
    return (
        <div className={styles.inputField}>
            <label htmlFor={inputId}>{title}</label>
            {prefix && <span className={styles.prefix}>{prefix}</span>}
            <input
                type={type}
                name={name}
                id={inputId}
                spellCheck={false}
                defaultValue={defaultValue}
                min={min}
                step={step}
                onChange={onChange}
            />
        </div>
    )
}

export {
    InputField,
    SelectField
}