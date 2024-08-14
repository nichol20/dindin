import { FinanceList, FinanceRow } from '../components/FinanceList'
import { Header } from '../components/Header'

import funnelIcon from '../assets/funnel.png'
import styles from '../styles/Home.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { Filters } from '../components/Filters'
import { RecordForm } from '../components/RecordForm'
import { createRecord, getRecords, getStatementSummary } from '../utils/api'
import { centsToReal, realToCents } from '../utils/money'
import { FinanceRecord, FinanceType, Order, OrderType, StatementSummary } from '../types/finance'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { sortRecords } from '../utils/finance'

export default function Home() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [showAddRecordForm, setShowAddRecordForm] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [records, setRecords] = useState<FinanceRecord[]>([])
    const [statementSummary, setStatementSummary] = useState<StatementSummary | null>(null)
    const [orderBy, setOrderBy] = useState<Order>("date")
    const [orderType, setOrderType] = useState<OrderType>("ascendant")

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

    const applyFilters = async (categories: string[]) => {
        if (categories.length > 0) {
            const records = await getRecords();
            const newRecords = records.filter(r => categories.includes(r.categoria_nome))
            setRecords(newRecords)
            let income = 0, expense = 0
            newRecords.forEach(r => r.tipo === "entrada" ? income += r.valor : expense += r.valor)
            setStatementSummary({
                entrada: income,
                saida: expense
            })
            return
        }

        refreshRecords()
    }

    const handleOrderChange = (order: Order, type: OrderType) => {
        const sortedRecords = sortRecords(records, order, type)
        setRecords([...sortedRecords])
    }

    const changeOrder = (order: Order) => {
        if (order === orderBy) {
            setOrderType(prev => {
                let newOrderType = prev
                newOrderType = prev === "ascendant" ? "descendant" : "ascendant"
                handleOrderChange(order, newOrderType)
                return newOrderType
            })
            return
        }

        handleOrderChange(order, orderType)
        setOrderBy(order)
    }

    const getTotal = () => {
        if (statementSummary) {
            return statementSummary.entrada - statementSummary.saida
        }

        return 0
    }

    const refreshRecords = useCallback(async () => {
        const records = await getRecords();
        const sortedRecords = sortRecords(records, orderBy, orderType)
        setRecords(sortedRecords);
        const summary = await getStatementSummary()
        setStatementSummary(summary)
    }, [orderBy, orderType])

    useEffect(() => {
        refreshRecords()
    }, [refreshRecords])

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
                        <Filters isOpen={showFilters} applyFilters={applyFilters} />
                        <FinanceList changeOrder={changeOrder} orderBy={orderBy} orderType={orderType}>
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
