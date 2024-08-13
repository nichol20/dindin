import { ReactNode, useState } from 'react'
import { FinanceRow } from './FinanceRow'

import styles from './style.module.scss'

export interface FinanceListProps {
    children: ReactNode
    onOrderChange: (order: Order, type: OrderType) => void
}

export type Order = "date" | "value"
export type OrderType = "ascendant" | "descendant"

const FinanceList = ({ children, onOrderChange }: FinanceListProps) => {
    const [orderBy, setOrderBy] = useState<Order>("date")
    const [orderType, setOrderType] = useState<OrderType>("ascendant")

    const handleClick = (order: Order) => {
        if (order === orderBy) {
            setOrderType(prev => {
                let newOrderType: OrderType = prev
                newOrderType = prev === "ascendant" ? "descendant" : "ascendant"
                onOrderChange(order, newOrderType)
                return newOrderType
            })
            return
        }

        onOrderChange(order, orderType)
        setOrderBy(order)
    }

    return (
        <div className={styles.financeList}>
            <div className={styles.header}>
                <div
                    className={`${styles.dateCol} ${styles.col}`}
                    onClick={() => handleClick("date")}
                >
                    <span className={styles.content}>Data</span>
                    {orderBy === "date" && <div className={`${styles.triangle} ${styles[orderType]}`}></div>}
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
                <div
                    className={`${styles.valueCol} ${styles.col}`}
                    onClick={() => handleClick("value")}
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