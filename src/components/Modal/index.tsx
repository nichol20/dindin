import styles from './style.module.scss'
import { ClosableComponent } from '../ClosableComponent'

interface ModalProps {
    className?: string
    children: React.ReactNode
    close: () => void
    title?: string
}

export const Modal = ({ className, children, close, title }: ModalProps) => {

    className = className ? className : ''

    return (
        <div className={`${styles.fixedBox}`}>
            <ClosableComponent isOpen={true} close={close} className={`${styles.modal} ${className}`}>
                <div className={styles.relativeBox}>
                    <div className={styles.header}>
                        <span className={styles.title}>{title}</span>
                        <button className={styles.closeBtn} onClick={close}>
                            +
                        </button>
                    </div>
                    {children}
                </div>
            </ClosableComponent>
        </div>
    )
}