import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */
const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading = false,
    disabled = false,
    icon: Icon,
    iconPosition = 'left',
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-rayco-forest text-white hover:bg-rayco-sage focus:ring-rayco-forest',
        secondary: 'bg-rayco-gold text-black hover:bg-yellow-400 focus:ring-rayco-gold',
        outline: 'border-2 border-rayco-forest text-rayco-forest hover:bg-rayco-forest hover:text-white focus:ring-rayco-forest',
        ghost: 'text-rayco-forest hover:bg-rayco-forest/10 focus:ring-rayco-forest',
        whatsapp: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-3 text-base rounded-lg',
        lg: 'px-8 py-4 text-lg rounded-full',
        xl: 'px-10 py-5 text-xl rounded-full'
    }

    return (
        <button
            ref={ref}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-5 h-5 mr-2" />}
                    {children}
                    {Icon && iconPosition === 'right' && <Icon className="w-5 h-5 ml-2" />}
                </>
            )}
        </button>
    )
})

Button.displayName = 'Button'

export default Button
