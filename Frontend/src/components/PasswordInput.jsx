import React, { useState } from 'react'

const PasswordInput = ({ id, name, placeholder, onChange }) => {
    const [ visible, setVisible ] = useState(false)

    return (
        <div className="input-group input-group--password">
            <label htmlFor={id}>Password</label>
            <div className="password-field">
                <input
                    onChange={onChange}
                    type={visible ? 'text' : 'password'}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={name === 'password' ? 'current-password' : 'new-password'}
                />
                <button
                    type="button"
                    className="password-field__toggle"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    aria-pressed={visible}
                >
                    {visible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    )
}

export default PasswordInput
