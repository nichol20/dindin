
import logo from '../../assets/logo.png'
import avatarIcon from '../../assets/avatar.png'
import exitIcon from '../../assets/exit.png'

import styles from './style.module.scss';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
    const { user, logout } = useAuth()

    return (
        <header className={styles.header}>
            <div className={styles.logoBox}>
                <img src={logo} alt="logo" />
                <span className={styles.appName}>Dindin</span>
            </div>
            {user &&
                <div className={styles.userBox}>
                    <button className={styles.editBtn}>
                        <img src={avatarIcon} alt="avatar" />
                        <span className={styles.username}>{user.nome}</span>
                    </button>
                    <button className={styles.logoutBtn} onClick={logout}>
                        <img src={exitIcon} alt="exit" />
                    </button>
                </div>}
        </header>
    )
}