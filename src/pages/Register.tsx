import { Header } from '../components/Header'
import { InputField } from '../components/InputField'

import styles from '../styles/Register.module.scss'

export default function RegisterPage() {
    return (
        <div className={styles.registerPage}>
            <Header />
            <main>
                <section className={styles.registerSection}>
                    <h1>Cadastre-se</h1>
                    <form className={styles.registerForm}>
                        <InputField inputId='nome' name='nome' type='text' />
                        <InputField inputId='email' name='e-mail' type='email' />
                        <InputField inputId='password' name='senha' type='password' />
                        <InputField inputId='password' name='confirmação de senha' type='password' />
                        <button className={styles.submitBtn}>Cadastrar</button>
                    </form>

                    <a className={styles.loginLink} href="/login">Já tem cadastro? Clique aqui!</a>
                </section>
            </main>
        </div>
    )
}