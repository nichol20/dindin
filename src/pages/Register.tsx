import { Header } from '../components/Header'
import { InputField } from '../components/InputField'
import { signUp } from '../utils/api'
import styles from '../styles/Register.module.scss'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate();

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        
        const name = formData.get('nome') as string;
        const email = formData.get('email') as string;
        const password1 = formData.get('senha') as string;
        const password2 = formData.get('confirmação de senha') as string;


        if (password1.length===0 || email.length===0 || name.length===0) {
            alert('Precisa preencher nome, e-mail e senha.')

        }
        if (password1 != password2) {

            alert ('A senha precisa ser digitada igualmente nos dois campos.')
        }

        try {
            await signUp(name,email,password1);
            navigate('/login');

        } catch (error: any) {
                alert ('Algo deu errado.')
        }

    }


        return (
        <div className={styles.registerPage}>
            <Header/>
            <main>
                <section className={styles.registerSection}>   
                    <h1>Cadastre-se</h1>
                    <form className={styles.registerForm} onSubmit={handleSubmit}>
                        <InputField inputId='nome' name='nome' type='text'/>
                        <InputField inputId='email' name='email' type='email' />
                        <InputField inputId='password1' name='senha' type='password' />
                        <InputField inputId='password2' name='confirmação de senha' type='password' />
                        <button className={styles.submitBtn}>Cadastrar</button>
                    </form>

                    <a className={styles.loginLink} href="/login">Já tem cadastro? Clique aqui!</a>
                </section>
            </main>
        </div>
    )
}