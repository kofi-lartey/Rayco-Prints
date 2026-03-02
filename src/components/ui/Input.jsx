import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Input Component
 * Reusable input field with label and error handling
 */
const Input = forwardRef(({
    label,
    error,
    className,
    containerClassName,
    ...props
}, ref) => {
    return (
        <div className={cn('w-full', containerClassName)}>
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                ref={ref}
                className={cn(
                    'w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-rayco-forest focus:ring-2 focus:ring-rayco-forest/20 outline-none transition-all',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

export default Input
