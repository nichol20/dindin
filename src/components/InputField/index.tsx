import styles from './style.module.scss'

interface InputFieldProps {
    name: string
    type: React.HTMLInputTypeAttribute
    inputId: string
}

export const InputField = ({ name, type, inputId }: InputFieldProps) => {
    return (
        <div className={styles.inputField}>
            <label htmlFor={inputId}>{name}</label>
            <input type={type} name={name} id={inputId} spellCheck={false} />
        </div>
    )
}