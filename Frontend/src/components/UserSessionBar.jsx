import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'

const UserSessionBar = () => {
    const { user, handleLogout } = useAuth()

    if (!user) {
        return null
    }

    return (
        <div className="user-session">
            <div className="user-session__profile">
                <span className="user-session__avatar" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </span>
                <span className="user-session__name">{user.username}</span>
            </div>
            <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
                aria-label="Log out of your account"
            >
                <span className="logout-btn__border" aria-hidden="true" />
                <span className="logout-btn__inner">
                    <svg className="logout-btn__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </span>
            </button>
        </div>
    )
}

export default UserSessionBar
