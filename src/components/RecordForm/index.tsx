import { InputField, SelectField } from '../InputField'
import { Modal } from '../Modal'
import styles from './style.module.scss'

interface Record {
    value: string
    category: string
    description: string
    date: string
    type: "income" | "expense"
}

interface RecordFormProps {
    title: string
    close: () => void
    record?: Record
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const RecordForm = ({ title, close, record, onSubmit }: RecordFormProps) => {
    return (
        <Modal close={close} title={title}>
            <form className={styles.recordForm} onSubmit={onSubmit}>
                <div className={styles.radioInput}>
                    <label className={styles.incomeLabel}>
                        Entrada
                        <input
                            type="radio"
                            name="financeType"
                            value="entrada"
                            defaultChecked={record ? record?.type === "expense" : true}
                        />
                    </label>
                    <label className={styles.expenseLabel}>
                        Saída
                        <input
                            type="radio"
                            name="financeType"
                            value="saída"
                            defaultChecked={record?.type === "income"}
                        />
                    </label>
                </div>
                <InputField inputId='value' name='valor' type='text' defaultValue={record?.value} />
                <SelectField selectId='category' name='categoria'>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </SelectField>
                <InputField inputId='date' name='data' type='date' defaultValue={record?.date} />
                <InputField inputId='description' name='descrição' type='text' defaultValue={record?.description} />
                <button type="submit" className={styles.submitBtn}>Confirmar</button>
            </form>
        </Modal>
    )
}