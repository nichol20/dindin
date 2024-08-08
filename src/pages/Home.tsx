import { FinanceList, FinanceRow } from '../components/FinanceList'
import { Header } from '../components/Header'

import funnelIcon from '../assets/funnel.png'
import styles from '../styles/Home.module.scss'
import { useEffect, useState } from 'react'
import { Filters } from '../components/Filters'
import withAuth from '../hoc/withAuth'
import { RecordForm } from '../components/RecordForm'
import { createRecord, getRecords } from '../utils/api'
import { Record } from '../utils/api'
import { formatDate, formatValue, getWeekDay } from '../utils/record'

function Home() {
    const [showAddRecordForm, setShowAddRecordForm] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [records, setRecords] = useState<Record[]>([])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        const recordType = formData.get('financeType')as string;
        const name = formData.get('nome')as string;
        const category = formData.get('categoria') as string;
        const value = formData.get('valor')as string;
        const date = formData.get('data')as string;
        const description = formData.get('descricao') as string;

        await createRecord({
            data:new Date(date).toISOString(),
            descricao:

        })

    }

    
    useEffect(()=> {
        
        const fetchRecords = async ()=> {

            const recordsReturn = await getRecords();
            setRecords(recordsReturn);
        }

        fetchRecords();

    },[]);




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
                            {records.map((record)=>
                                <FinanceRow
                                category={record.categoria_nome}
                                date={formatDate(record.data)}
                                description={record.descricao}
                                value={formatValue(record.valor)}
                                weekday={getWeekDay(record.data)}
                                type={record.tipo}
                            />)}
                        </FinanceList>
                    </div>
                    <aside className={styles.financesAside}>
                        <div className={styles.summary}>
                            <h3>Resumo</h3>
                            <div className={`${styles.amountBox} ${styles.income}`}>
                                <span>Entradas</span>
                                <span>R$200,00</span>
                            </div>
                            <div className={`${styles.amountBox} ${styles.expense}`}>
                                <span>Saídas</span>
                                <span>R$70,50</span>
                            </div>
                            <div className={`${styles.amountBox} ${styles.balance}`}>
                                <span>Saldo</span>
                                <span>R$129,50</span>
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

export default withAuth(Home)