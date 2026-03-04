import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Button Component
 * Modern, elegant button with multiple variants and sizes
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
    fullWidth = false,
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

    const variants = {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-soft hover:shadow-medium',
        secondary: 'bg-accent-500 text-neutral-900 hover:bg-accent-400 focus:ring-accent-500 shadow-soft hover:shadow-medium',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
        ghost: 'text-primary-500 hover:bg-primary-500/10 focus:ring-primary-500',
        whatsapp: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-soft',
        danger: 'bg-error text-white hover:bg-red-600 focus:ring-error shadow-soft',
        light: 'bg-white text-primary-500 hover:bg-neutral-50 focus:ring-primary-500 shadow-soft',
        dark: 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900',
    }

    const sizes = {
        xs: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
        sm: 'px-4 py-2 text-sm rounded-xl gap-2',
        md: 'px-5 py-2.5 text-base rounded-xl gap-2',
        lg: 'px-6 py-3 text-lg rounded-xl gap-2.5',
        xl: 'px-8 py-4 text-xl rounded-2xl gap-3',
    }

    return (
        <button
            ref={ref}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
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
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
                    {children}
                    {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
                </>
            )}
        </button>
    )
})

Button.displayName = 'Button'

export default Button
