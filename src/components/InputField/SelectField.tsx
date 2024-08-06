import { ReactNode } from 'react'
import styles from './style.module.scss'

interface SelectFieldProps {
    name: string
    selectId: string
    children: ReactNode
}

export const SelectField = ({ children, name, selectId }: SelectFieldProps) => {
    return (
        <div className={styles.inputField}>
            <label htmlFor={selectId}>{name}</label>
            <select name={name} id={selectId}>
                {children}
            </select>
        </div>
    )
}