import { FinanceList, FinanceRow } from '../components/FinanceList'
import { Header } from '../components/Header'

import funnelIcon from '../assets/funnel.png'
import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'
import { Filters } from '../components/Filters'
import { RecordForm } from '../components/RecordForm'
import { createRecord, getRecords, getStatementSummary } from '../utils/api'
import { centsToReal, realToCents } from '../utils/money'
import { FinanceRecord, FinanceType, StatementSummary } from '../types/finance'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [showAddRecordForm, setShowAddRecordForm] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [records, setRecords] = useState<FinanceRecord[]>([])
    const [statementSummary, setStatementSummary] = useState<StatementSummary | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

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
            await createRecord({
                data: new Date(date).toISOString(),
                descricao: description,
                valor: realToCents(value),
                categoria_id: parseInt(category),
                tipo: financeType
            })
            setShowAddRecordForm(false)
            refreshRecords()
        } catch (error: any) {
            console.log(error)
            alert("algo deu errado!")
        }
    }

    const getTotal = () => {
        if (statementSummary) {
            return statementSummary.entrada - statementSummary.saida
        }

        return 0
    }

    const refreshRecords = async () => {
        const r = await getRecords();
        setRecords(r);
        const ss = await getStatementSummary()
        setStatementSummary(ss)
    }

    useEffect(() => {
        refreshRecords()
    }, [])

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    return (
        <div className={styles.homePage}>
            <Header />
            <main className={styles.content}>
                <button className={styles.filterBtn} onClick={() => setShowFilters(prev => !prev)}>
                    <img src={funnelIcon} alt="funnel" />
                    <span>Filtrar</span>
                </button>
                <section className={styles.finances}>
                    <div className={styles.listContainer}>
                        <Filters isOpen={showFilters} />
                        <FinanceList>
                            {records.map((record) => <FinanceRow key={record.id} record={record} refreshRecords={refreshRecords} />)}
                        </FinanceList>
                    </div>
                    <aside className={styles.financesAside}>
                        <div className={styles.summary}>
                            <h3>Resumo</h3>
                            <div className={`${styles.amountBox} ${styles.income}`}>
                                <span>Entradas</span>
                                <span>{statementSummary ? centsToReal(statementSummary.entrada, true) : "R$0,00"}</span>
                            </div>
                            <div className={`${styles.amountBox} ${styles.expense}`}>
                                <span>Saídas</span>
                                <span>{statementSummary ? centsToReal(statementSummary.saida, true) : "R$0,00"}</span>
                            </div>
                            <div className={`${styles.amountBox} ${styles.balance}`}>
                                <span>Saldo</span>
                                <span>{centsToReal(getTotal(), true)}</span>
                            </div>
                        </div>
                        <button className={styles.addRecordBtn} onClick={() => setShowAddRecordForm(true)}>Adicionar Registro</button>
                        {showAddRecordForm &&
                            <RecordForm
                                close={() => setShowAddRecordForm(false)}
                                title='Adicionar Registro'
                                onSubmit={handleSubmit}
                            />
                        }
                    </aside>
                </section>
            </main>
        </div>
    )
}
