import { ReactNode } from 'react'
import styles from './style.module.scss'

interface SelectFieldProps {
    title: string
    name: string
    selectId: string
    children: ReactNode
    value?: string | number | readonly string[]
}

export const SelectField = ({ children, name, title, selectId, value }: SelectFieldProps) => {
    return (
        <div className={styles.inputField}>
            <label htmlFor={selectId}>{title}</label>
            <select name={name} id={selectId} value={value}>
                {children}
            </select>
        </div>
    )
}