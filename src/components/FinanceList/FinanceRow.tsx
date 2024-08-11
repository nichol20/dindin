import { useState } from 'react'
import pencilIcon from '../../assets/pencil.png'
import trashCanIcon from '../../assets/trash-can.png'
import { ClosableComponent } from '../ClosableComponent'
import styles from './style.module.scss'
import { RecordForm } from '../RecordForm'
import { FinanceRecord, FinanceType } from '../../types/finance'
import { formatToInputDate, getWeekday } from '../../utils/date'
import { centsToReal, realToCents } from '../../utils/money'
import { deleteRecord, editRecord } from '../../utils/api'

export interface FinanceRowProps {
    record: FinanceRecord
    refreshRecords: () => void
}

export const FinanceRow = ({ record, refreshRecords }: FinanceRowProps) => {
    const [showDeleteConfimationBox, setShowDeleteConfimationBox] = useState(false)
    const [showEditRecordForm, setShowEditRecordForm] = useState(false)
    const showDeleteConfirmationBox = () => setShowDeleteConfimationBox(true)
    const closeDeleteConfimationBox = () => setShowDeleteConfimationBox(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const financeType = formData.get('financeType') as FinanceType;
        const category = formData.get('category') as string;
        const value = formData.get('value') as string;
        const date = formData.get('date') as string;
        const description = formData.get('description') as string;

        for (const pair of formData.entries()) {
            const isFieldEmpty = (pair[1] as string).length === 0

            if (isFieldEmpty) {
                alert("Todos os campos são obrigatórios")
                return
            }
        }

        try {
            await editRecord(record.id, {
                data: formatToInputDate(date) + " " + new Date().toLocaleTimeString(),
                descricao: description,
                valor: realToCents(value),
                categoria_id: parseInt(category),
                tipo: financeType
            })
            setShowEditRecordForm(false)
            refreshRecords()
        } catch (error: any) {
            alert("algo deu errado!")
        }
    }

    const handleRecordDeletion = async () => {
        closeDeleteConfimationBox()
        await deleteRecord(record.id)
        refreshRecords()
    }


    return (
        <div className={styles.financeRow} data-type={record.tipo === "entrada" ? "income" : "expense"}>
            <div className={`${styles.dateRow} ${styles.row}`}>
                <span className={styles.content}>{new Date(record.data).toLocaleDateString()}</span>
            </div>
            <div className={`${styles.weekdayRow} ${styles.row}`}>
                <span className={styles.content}>{getWeekday(record.data)}</span>
            </div>
            <div className={`${styles.descriptionRow} ${styles.row}`}>
                <span className={styles.content}>{record.descricao}</span>
            </div>
            <div className={`${styles.categoryRow} ${styles.row}`}>
                <span className={styles.content}>{record.categoria_nome}</span>
            </div>
            <div className={`${styles.valueRow} ${styles.row}`}>
                <span className={styles.content}>{centsToReal(record.valor, true)}</span>
            </div>
            <button className={styles.editBtn} onClick={() => setShowEditRecordForm(true)}>
                <img src={pencilIcon} alt="pencil" />
            </button>
            <div className={styles.removeBtnBox}>
                <button className={styles.removeBtn} onClick={showDeleteConfirmationBox}>
                    <img src={trashCanIcon} alt="trash can" />
                </button>
                <ClosableComponent
                    isOpen={showDeleteConfimationBox}
                    className={styles.deleteConfirmationBox}
                    close={closeDeleteConfimationBox}
                >
                    <span>Apagar item?</span>
                    <div className={styles.deletionOptions}>
                        <button className={styles.confirm} onClick={handleRecordDeletion}>Sim</button>
                        <button className={styles.cancel} onClick={closeDeleteConfimationBox}>Não</button>
                    </div>
                </ClosableComponent>
            </div>
            {showEditRecordForm &&
                <RecordForm
                    close={() => setShowEditRecordForm(false)}
                    title='Editar Registro'
                    onSubmit={handleSubmit}
                    record={record}
                />}
        </div>
    )
}