import { Header } from '../components/Header'
import { InputField } from '../components/InputField'
import { signUp } from '../utils/api'
import styles from '../styles/Register.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

export default function RegisterPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password1 = formData.get('password1') as string;
        const password2 = formData.get('password2') as string;

        if (password1.length === 0 || email.length === 0 || name.length === 0) {
            alert('Precisa preencher nome, e-mail e senha.')
        }
        if (password1 != password2) {
            alert('A senha precisa ser digitada igualmente nos dois campos.')
        }

        try {
            await signUp(name, email, password1);
            navigate('/login');

        } catch (error: any) {
            if (error.response.status === 400) {
                alert('Esse email já existe.')
            }
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div className={styles.registerPage}>
            <Header />
            <main className={styles.content}>
                <section className={styles.registerSection}>
                    <h1>Cadastre-se</h1>
                    <form className={styles.registerForm} onSubmit={handleSubmit}>
                        <InputField inputId='nome' title='nome' name="name" type='text' />
                        <InputField inputId='email' title='e-mail' name="email" type='email' />
                        <InputField inputId='password1' title='senha' name="password1" type='password' />
                        <InputField inputId='password2' title='confirmação de senha' name="password2" type='password' />
                        <button className={styles.submitBtn}>Cadastrar</button>
                    </form>

                    <a className={styles.loginLink} href="/login">Já tem cadastro? Clique aqui!</a>
                </section>
            </main>
        </div>
    )
}