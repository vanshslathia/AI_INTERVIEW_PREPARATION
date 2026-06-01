import React from 'react'
import '../style/loading.scss'

const LoadingScreen = ({
    variant = 'ai',
    title = 'Preparing your experience',
    message,
}) => {
    const isAi = variant === 'ai'

    return (
        <main
            className={`loading-screen loading-screen--${variant}`}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="loading-screen__backdrop" aria-hidden="true" />
            <div className="loading-screen__content">
                <div className="loading-screen__orb" aria-hidden="true">
                    <div className="loading-screen__orb-ring" />
                    <div className="loading-screen__orb-core" />
                </div>
                <h1 className="loading-screen__title">{title}</h1>
                <p className="loading-screen__status">
                    {isAi ? (
                        <>
                            <span className="loading-screen__step">Analyzing Resume</span>
                            <span className="loading-screen__step">Matching Skills</span>
                            <span className="loading-screen__step">Generating Personalized Roadmap</span>
                        </>
                    ) : (
                        <span className="loading-screen__step">{message || 'Please wait...'}</span>
                    )}
                </p>
            </div>
        </main>
    )
}

export default LoadingScreen
