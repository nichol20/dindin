import { Header } from '../components/Header'
import { InputField } from '../components/InputField'
import styles from '../styles/Login.module.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (password.length === 0 || email.length === 0) {
            alert('Precisa preencher e-mail e senha.')
            return
        }

        try {
            await login(email, password);
        } catch (error: any) {
            if (error.response.status === 400) {
                alert('Email ou senha incorreta.')
            }
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div className={styles.loginPage}>
            <Header />
            <main className={styles.content}>
                <section className={styles.descriptionSection}>
                    <h2>Controle suas <span className={styles.highlightedTxt}>finanças</span>, sem planilha chata.</h2>
                    <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                    <button onClick={() => navigate("/register")}>Cadastre-se</button>
                </section>
                <section className={styles.loginSection}>
                    <h1>Login</h1>
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <InputField inputId='email' title='e-mail' name="email" type='email' />
                        <InputField inputId='password' title='password' name="password" type='password' />
                        <button className={styles.submitBtn}>Entrar</button>
                    </form>
                </section>
            </main>
        </div>
    )
}

