import { useState, useEffect } from 'react'

const LogoLoader = ({ pathname }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Reset loading state when pathname changes (navigation occurs)
    setIsLoading(true)
    setFadeOut(false)
    
    // Minimum display time to ensure logo is visible (1.5 seconds)
    const minDisplayTime = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500) // Wait for fade out animation
    }, 1500)

    // Cleanup
    return () => clearTimeout(minDisplayTime)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
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
      <div style={{ textAlign: 'center', position: 'relative' }}>
        {/* Animated Ring */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: '3px solid transparent',
          borderTopColor: '#3b82f6',
          borderRightColor: '#8b5cf6',
          borderBottomColor: '#ec4899',
          borderLeftColor: '#f59e0b',
          animation: 'spin 1.5s linear infinite',
          opacity: 0.3
        }} />

        {/* Logo Container with Scale Animation */}
        <div style={{
          animation: 'scaleIn 0.6s ease-out forwards',
        }}>
          <img
            src="https://res.cloudinary.com/djjgkezui/image/upload/v1772650253/logo_krbgmz.png"
            alt="RaycoPrints"
            style={{
              width: '140px',
              height: 'auto',
              borderRadius: '12px',
              animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            }}
          />
        </div>

        {/* Loading Text */}
        <div style={{
          marginTop: '24px',
          opacity: 0,
          animation: 'fadeIn 0.5s ease-out 0.2s forwards',
        }}>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            Loading
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginTop: '8px'
          }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  animation: `bounce ${0.6 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes scaleIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          
          @keyframes glow {
            0% {
              filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
            }
            100% {
              filter: drop-shadow(0 0 25px rgba(139, 92, 246, 0.5));
            }
          }
          
          @keyframes bounce {
            0%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-12px);
            }
          }
          
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default LogoLoader
