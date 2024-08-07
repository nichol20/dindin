import { FinanceList, FinanceRow } from '../components/FinanceList'
import { Header } from '../components/Header'

import funnelIcon from '../assets/funnel.png'
import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import { Filters } from '../components/Filters'
import withAuth from '../hoc/withAuth'
import { RecordForm } from '../components/RecordForm'

function Home() {
    const [showAddRecordForm, setShowAddRecordForm] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

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
                            <FinanceRow
                                category='Pix'
                                date='01/09/21'
                                description='Venda dos brigadeiros dasodihsado isah doisahdoi sahdoi has dasphd pas dposajd poasjd posaj podajsop'
                                value='R$100,00'
                                weekday='Quarta'
                                type='income'
                            />
                            <FinanceRow
                                category='Lazer'
                                date='02/09/21'
                                description='-'
                                value='R$59,50'
                                weekday='Quinta'
                                type='expense'
                            />
                            <FinanceRow
                                category='Alimentação'
                                date='03/09/21'
                                description='-'
                                value='R$12,50'
                                weekday='Sexta'
                                type='expense'
                            />
                            <FinanceRow
                                category='Alimentação'
                                date='06/09/21'
                                description='Venda dos casadinhos'
                                value='R$100,00'
                                weekday='Segunda'
                                type='income'
                            />
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
                                onSubmit={() => { }}
                            />
                        }
                    </aside>
                </section>
            </main>
        </div>
    )
}

export default withAuth(Home)