
import logo from '../../assets/logo.png'
import styles from './style.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoBox}>
                <img src={logo} alt="logo" />
                <span className={styles.appName}>Dindin</span>
            </div>
        </header>
    )
}