import { ReactNode } from 'react'
import { FinanceRow } from './FinanceRow'

import styles from './style.module.scss'

export interface FinanceListProps {
    children: ReactNode
}

const FinanceList = ({ children }: FinanceListProps) => {
    return (
        <div className={styles.financeList}>
            <div className={styles.header}>
                <div className={`${styles.dateCol} ${styles.col}`}>
                    <span className={styles.content}>Data</span>
                </div>
                <div className={`${styles.weekdayCol} ${styles.col}`}>
                    <span className={styles.content}>Dia da semana</span>
                </div>
                <div className={`${styles.descriptionCol} ${styles.col}`}>
                    <span className={styles.content}>Descrição</span>
                </div>
                <div className={`${styles.categoryCol} ${styles.col}`}>
                    <span className={styles.content}>Categoria</span>
                </div>
                <div className={`${styles.valueCol} ${styles.col}`}>
                    <span className={styles.content}>Valor</span>
                </div>
            </div>
            <div className={styles.rows}>
                {children}
            </div>
        </div>
    )
}

export {
    FinanceRow,
    FinanceList
}