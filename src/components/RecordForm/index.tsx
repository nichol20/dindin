import { useEffect, useState } from 'react'
import { InputField, SelectField } from '../InputField'
import { Modal } from '../Modal'
import styles from './style.module.scss'
import { getCategories } from '../../utils/api'
import { Category, FinanceRecord } from '../../types/finance'
import { formatToInputDate } from '../../utils/date'
import { centsToReal } from '../../utils/money'

interface RecordFormProps {
    title: string
    close: () => void
    record?: FinanceRecord
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const RecordForm = ({ title, close, record, onSubmit }: RecordFormProps) => {
    const [categories, setCategories] = useState<Category[]>([])

    const handleMoneyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.target.value
        if (currentValue.split(".")[1]?.length > 2) {
            event.target.value = parseFloat(currentValue).toFixed(2)
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {

            const categoriesReturn = await getCategories()
            setCategories(categoriesReturn)
        }

        fetchCategories()
    }, [])

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
                            defaultChecked={record ? record?.tipo === "entrada" : true}
                        />
                    </label>
                    <label className={styles.expenseLabel}>
                        Saída
                        <input
                            type="radio"
                            name="financeType"
                            value="saida"
                            defaultChecked={record?.tipo === "saida"}
                        />
                    </label>
                </div>
                <InputField
                    inputId='value'
                    title='valor'
                    name="value"
                    type='number'
                    min='0.01'
                    step='0.01'
                    defaultValue={record ? centsToReal(record.valor, false) : 0.01}
                    prefix='R$'
                    onChange={handleMoneyInputChange}
                />
                <SelectField selectId='category' title='categoria' name="category" defaultValue={1}>
                    {categories.map(category => {
                        return <option
                            value={category.id}
                            key={category.id}
                            selected={category.descricao === record?.categoria_nome}>
                            {category.descricao}
                        </option>
                    })}
                </SelectField>
                <InputField
                    inputId='date'
                    title='data'
                    name="date"
                    type='date'
                    defaultValue={formatToInputDate(record?.data ?? "")}
                />
                <InputField
                    inputId='description'
                    title='descrição'
                    name="description"
                    type='text'
                    defaultValue={record?.descricao}
                />
                <button type="submit" className={styles.submitBtn}>Confirmar</button>
            </form>
        </Modal>
    )
}