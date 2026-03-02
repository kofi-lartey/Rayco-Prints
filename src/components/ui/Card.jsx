import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Card Component
 * Reusable card container with header, title, description, content, and footer
 */
const Card = forwardRef(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})

Card.displayName = 'Card'

/**
 * CardHeader Component
 */
const CardHeader = forwardRef(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn('px-6 py-4 border-b border-slate-200', className)}
            {...props}
        >
            {children}
        </div>
    )
})

CardHeader.displayName = 'CardHeader'

/**
 * CardTitle Component
 */
const CardTitle = forwardRef(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <h3
            ref={ref}
            className={cn('text-xl font-semibold text-slate-900', className)}
            {...props}
        >
            {children}
        </h3>
    )
})

CardTitle.displayName = 'CardTitle'

/**
 * CardDescription Component
 */
const CardDescription = forwardRef(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <p
            ref={ref}
            className={cn('mt-1 text-sm text-slate-500', className)}
            {...props}
        >
            {children}
        </p>
    )
})

CardDescription.displayName = 'CardDescription'

/**
 * CardContent Component
 */
const CardContent = forwardRef(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn('px-6 py-4', className)}
            {...props}
        >
            {children}
        </div>
    )
})

CardContent.displayName = 'CardContent'

/**
 * CardFooter Component
 */
const CardFooter = forwardRef(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <div
            ref={ref}
            className={cn('px-6 py-4 bg-slate-50 border-t border-slate-200', className)}
            {...props}
        >
            {children}
        </div>
    )
})

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
