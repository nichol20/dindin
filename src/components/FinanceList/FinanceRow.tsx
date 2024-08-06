import { useState } from 'react'
import pencilIcon from '../../assets/pencil.png'
import trashCanIcon from '../../assets/trash-can.png'
import { ClosableComponent } from '../ClosableComponent'
import styles from './style.module.scss'

export interface FinanceRowProps {
    date: string
    weekday: string
    description: string
    category: string
    value: string
    type: "expense" | "income"
}

export const FinanceRow = ({ category, date, description, value, weekday, type }: FinanceRowProps) => {
    const [showDeleteConfimationBox, setShowDeleteConfimationBox] = useState(false)

    const closeDeleteConfimationBox = () => setShowDeleteConfimationBox(false)

    return (
        <div className={styles.financeRow} data-type={type}>
            <div className={`${styles.dateRow} ${styles.row}`}>
                <span className={styles.content}>{date}</span>
            </div>
            <div className={`${styles.weekdayRow} ${styles.row}`}>
                <span className={styles.content}>{weekday}</span>
            </div>
            <div className={`${styles.descriptionRow} ${styles.row}`}>
                <span className={styles.content}>{description}</span>
            </div>
            <div className={`${styles.categoryRow} ${styles.row}`}>
                <span className={styles.content}>{category}</span>
            </div>
            <div className={`${styles.valueRow} ${styles.row}`}>
                <span className={styles.content}>{value}</span>
            </div>
            <button className={styles.editBtn}>
                <img src={pencilIcon} alt="pencil" />
            </button>
            <div className={styles.removeBtnBox}>
                <button className={styles.removeBtn} onClick={() => setShowDeleteConfimationBox(true)}>
                    <img src={trashCanIcon} alt="trash can" />
                </button>
                <ClosableComponent
                    isOpen={showDeleteConfimationBox}
                    className={styles.deleteConfirmationBox}
                    close={closeDeleteConfimationBox}
                >
                    <span>Apagar item?</span>
                    <div className={styles.deletionOptions}>
                        <button className={styles.confirm}>Sim</button>
                        <button className={styles.cancel} onClick={closeDeleteConfimationBox}>Não</button>
                    </div>
                </ClosableComponent>
            </div>
        </div>
    )
}