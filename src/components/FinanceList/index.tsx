import { ReactNode } from 'react'
import { FinanceRow } from './FinanceRow'

import styles from './style.module.scss'
import { Order, OrderType } from '../../types/finance'

export interface FinanceListProps {
    children: ReactNode
    orderBy: Order
    orderType: OrderType
    changeOrder: (order: Order) => void
}

const FinanceList = ({ children, changeOrder, orderBy, orderType }: FinanceListProps) => {
    return (
        <div className={styles.financeList}>
            <div className={styles.header}>
                <div
                    className={`${styles.dateCol} ${styles.col}`}
                    onClick={() => changeOrder("date")}
                >
                    <span className={styles.content}>Data</span>
                    {orderBy === "date" && <div className={`${styles.triangle} ${styles[orderType]}`}></div>}
                </div>
                <div className={`${styles.weekdayCol} ${styles.col}`}>
                    <span className={styles.content}>Dia da semana</span>
                </div>
                <div
                    className={`${styles.descriptionCol} ${styles.col}`}
                    onClick={() => changeOrder("description")}
                >
                    <span className={styles.content}>Descrição</span>
                    {orderBy === "description" && <div className={`${styles.triangle} ${styles[orderType]}`}></div>}
                </div>
                <div
                    className={`${styles.categoryCol} ${styles.col}`}
                    onClick={() => changeOrder("category")}
                >
                    <span className={styles.content}>Categoria</span>
                    {orderBy === "category" && <div className={`${styles.triangle} ${styles[orderType]}`}></div>}
                </div>
                <div
                    className={`${styles.valueCol} ${styles.col}`}
                    onClick={() => changeOrder("value")}
                >
                    <span className={styles.content}>Valor</span>
                    {orderBy === "value" && <div className={`${styles.triangle} ${styles[orderType]}`}></div>}
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