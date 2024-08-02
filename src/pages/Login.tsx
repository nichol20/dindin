import { Header } from '../components/Header'
import { InputField } from '../components/InputField'
import { login } from '../utils/api'
import styles from '../styles/Login.module.scss'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (password.length===0 || email.length===0) {
            alert('Precisa preencher e-mail e senha.')
            return
        }

        try {
            const responseLogin = await login(email,password);
            localStorage.setItem('token',responseLogin.token);
            navigate('/');
        } catch (error: any) {
            if (error.response.status === 400) {
                alert ('Email ou senha incorreta.')
            }
        }
    };


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
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <InputField inputId='email' name='email' type='email' />
                        <InputField inputId='password' name='password' type='password' />
                        <button className={styles.submitBtn}>Entrar</button>
                    </form>
                </section>
            </main>
        </div>
    )
}