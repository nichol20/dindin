import styles from './style.module.scss'

interface FiltersProps {
    isOpen?: boolean
}

export const Filters = ({ isOpen = false }: FiltersProps) => {


    return (
        <div className={`${styles.filters} ${isOpen ? styles.active : ""}`}>
            <div className={styles.categories}>
                <span className={styles.title}>Categoria</span>
                <div className={styles.list}>
                    <div>
                        Contas
                        <span>+</span>
                    </div>
                    <div>
                        Lazer
                        <span>+</span>
                    </div>
                    <div>
                        Depósito
                        <span>+</span>
                    </div>
                    <div>
                        Compras
                        <span>+</span>
                    </div>
                    <div>
                        Mercado
                        <span>+</span>
                    </div>
                    <div>
                        Farmácia
                        <span>+</span>
                    </div>
                    <div>
                        Contas
                        <span>+</span>
                    </div>
                    <div>
                        TED
                        <span>+</span>
                    </div>
                    <div>
                        Pix
                        <span>+</span>
                    </div>
                    <div>
                        Pix
                        <span>+</span>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                <button className={styles.cleanBtn}>Limpar filtros</button>
                <button className={styles.applyBtn}>Aplicar filtros</button>
            </div>
        </div>
    )
}