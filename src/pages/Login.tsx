import { Header } from '../components/Header'
import { InputField } from '../components/InputField'

import styles from '../styles/Login.module.scss'

export default function LoginPage() {
    return (
        <div className={styles.loginPage}>
            <Header />
            <main>
                <section className={styles.descriptionSection}>
                    <h2>Controle suas <span className={styles.highlightedTxt}>finanças</span>, sem planilha chata.</h2>
                    <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                    <button>Cadastre-se</button>
                </section>
                <section className={styles.loginSection}>
                    <h1>Login</h1>
                    <form className={styles.loginForm}>
                        <InputField inputId='email' name='email' type='email' />
                        <InputField inputId='password' name='password' type='password' />
                        <button className={styles.submitBtn}>Entrar</button>
                    </form>
                </section>
            </main>
        </div>
    )
}