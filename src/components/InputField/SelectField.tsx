import { ReactNode } from 'react'
import styles from './style.module.scss'

interface SelectFieldProps {
    title: string
    name: string
    selectId: string
    children: ReactNode
    defaultValue?: string | number | readonly string[]
}

export const SelectField = ({ children, name, title, selectId, defaultValue }: SelectFieldProps) => {
    return (
        <div className={styles.inputField}>
            <label htmlFor={selectId}>{title}</label>
            <select name={name} id={selectId} defaultValue={defaultValue}>
                {children}
            </select>
        </div>
    )
}