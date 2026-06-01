import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import LoadingScreen from '../../../components/LoadingScreen'
import PasswordInput from '../../../components/PasswordInput'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({username,email,password})
        navigate("/")
    }

    if(loading){
        return (
            <LoadingScreen
                variant="auth"
                title="Creating your account"
                message="Setting up your profile"
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
                            <h1 className="auth-card__title">Register</h1>
                            <p className="auth-card__subtitle">Start building AI-powered interview plans tailored to your goals.</p>
                        </header>

                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    type="text" id="username" name='username' placeholder='Enter username' />
                            </div>
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

                            <button className='button primary-button' type="submit">Register</button>

                        </form>

                        <p className="auth-card__footer">Already have an account? <Link to={"/login"} >Login</Link></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register
