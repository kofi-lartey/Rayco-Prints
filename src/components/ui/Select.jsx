import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Select Component
 * Modern, elegant select dropdown with label and error handling
 */
const Select = forwardRef(({
    label,
    options = [],
    error,
    placeholder = 'Select an option',
    className,
    containerClassName,
    children,
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
                <select
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-800 appearance-none',
                        'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
                        'outline-none transition-all duration-200',
                        'disabled:bg-neutral-50 disabled:cursor-not-allowed',
                        error && 'border-error focus:border-error focus:ring-error/10',
                        className
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {children ? (
                        children
                    ) : (
                        options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                    )}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-error">{error}</p>
            )}
        </div>
    )
})

Select.displayName = 'Select'

export default Select
