import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Select Component
 * Reusable select dropdown with label and error handling
 */
const Select = forwardRef(({
    label,
    options = [],
    error,
    placeholder = 'Select an option',
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
            <select
                ref={ref}
                className={cn(
                    'w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-rayco-forest focus:ring-2 focus:ring-rayco-forest/20 outline-none transition-all bg-white',
                    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                    className
                )}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
})

Select.displayName = 'Select'

export default Select
