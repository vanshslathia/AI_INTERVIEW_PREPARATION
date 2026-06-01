import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import LoadingScreen from '../../../components/LoadingScreen'
import PasswordInput from '../../../components/PasswordInput'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return (
            <LoadingScreen
                variant="auth"
                title="Signing you in"
                message="Verifying your credentials"
            />
        )
    }


    return (
        <main className="auth-page">
            <div className="auth-page__ambient" aria-hidden="true" />
            <div className="auth-page__grid" aria-hidden="true" />
            <div className="auth-card">
                <div className="auth-card__border">
                    <div className="auth-card__inner form-container">
                        <header className="auth-card__brand">
                            <span className="auth-card__logo" aria-hidden="true">AI</span>
                            <h1 className="auth-card__title">Login</h1>
                            <p className="auth-card__subtitle">Sign in to access your personalized interview strategies.</p>
                        </header>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" id="email" name='email' placeholder='Enter email address' />
                            </div>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <button className='button primary-button' type="submit">Login</button>
                        </form>
                        <p className="auth-card__footer">Don't have an account? <Link to={"/register"} >Register</Link></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login
