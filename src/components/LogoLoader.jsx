import { useState, useEffect } from 'react'

const LogoLoader = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        // Minimum display time to ensure logo is visible (1.5 seconds)
        const minDisplayTime = setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 500) // Wait for fade out animation
        }, 1500)

        // Cleanup
        return () => clearTimeout(minDisplayTime)
    }, [])

    if (!isLoading) return null

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                zIndex: 9999,
                transition: 'opacity 0.5s ease-in-out',
                opacity: fadeOut ? 0 : 1
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <img
                    src="https://res.cloudinary.com/djjgkezui/image/upload/v1772650253/logo_krbgmz.png"
                    alt="RaycoPrints"
                    style={{
                        width: '150px',
                        height: 'auto',
                        animation: 'pulse 1.5s ease-in-out infinite, bounce 2s ease-in-out infinite',
                    }}
                />
                <style>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
            </div>
        </div>
    )
}

export default LogoLoader
