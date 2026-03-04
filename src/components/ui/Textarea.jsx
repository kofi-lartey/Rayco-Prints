import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Textarea Component
 * Modern, elegant textarea with label and error handling
 */
const Textarea = forwardRef(({
    label,
    error,
    className,
    containerClassName,
    rows = 4,
    showCount = false,
    maxLength,
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
            <textarea
                ref={ref}
                rows={rows}
                maxLength={maxLength}
                className={cn(
                    'w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-800',
                    'placeholder:text-neutral-400',
                    'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10',
                    'outline-none transition-all duration-200 resize-none',
                    'disabled:bg-neutral-50 disabled:cursor-not-allowed',
                    error && 'border-error focus:border-error focus:ring-error/10',
                    className
                )}
                {...props}
            />
            <div className="flex justify-between mt-1.5">
                {error && (
                    <p className="text-sm text-error">{error}</p>
                )}
                {showCount && maxLength && (
                    <p className="text-sm text-neutral-400 ml-auto">
                        {props.value?.length || 0} / {maxLength}
                    </p>
                )}
            </div>
        </div>
    )
})

Textarea.displayName = 'Textarea'

export default Textarea
