import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Input Component
 * Modern, elegant input field with label and error handling
 */
const Input = forwardRef(({
    label,
    error,
    className,
    containerClassName,
    icon: Icon,
    iconPosition = 'left',
    ...props
}, ref) => {
    return (
        <div className={cn('w-full', containerClassName)}>
            {label && (
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {label}
                    {props.required && <span className="text-error ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {Icon && iconPosition === 'left' && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-800',
                        'placeholder:text-neutral-400',
                        'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
                        'outline-none transition-all duration-200',
                        'disabled:bg-neutral-50 disabled:cursor-not-allowed',
                        Icon && iconPosition === 'left' && 'pl-12',
                        Icon && iconPosition === 'right' && 'pr-12',
                        error && 'border-error focus:border-error focus:ring-error/10',
                        className
                    )}
                    {...props}
                />
                {Icon && iconPosition === 'right' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-error">{error}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

export default Input
