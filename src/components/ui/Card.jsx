import { forwardRef } from 'react'
import { cn } from '../../utils'

/**
 * Card Component
 * Modern, elegant card container with multiple variants
 */
const Card = forwardRef(({
    children,
    className,
    variant = 'default',
    hover = false,
    padding = 'default',
    ...props
}, ref) => {
    const variants = {
        default: 'bg-white rounded-2xl shadow-soft border border-neutral-100',
        elevated: 'bg-white rounded-2xl shadow-medium-lg border border-neutral-100',
        outlined: 'bg-white rounded-2xl border-2 border-neutral-200',
        ghost: 'bg-neutral-50 rounded-2xl border border-neutral-100',
        dark: 'bg-neutral-900 rounded-2xl border border-neutral-800',
    }

    const paddings = {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
    }

    const hoverStyles = hover && 'transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer'

    return (
        <div
            ref={ref}
            className={cn(
                variants[variant],
                paddings[padding],
                hoverStyles,
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
            className={cn('px-6 py-4 border-b border-neutral-100', className)}
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
    as: Component = 'h3',
    ...props
}, ref) => {
    return (
        <Component
            ref={ref}
            className={cn('text-xl font-heading font-semibold text-neutral-900', className)}
            {...props}
        >
            {children}
        </Component>
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
            className={cn('mt-1 text-sm text-neutral-500', className)}
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
    align = 'left',
    ...props
}, ref) => {
    const alignments = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
    }

    return (
        <div
            ref={ref}
            className={cn('px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex', alignments[align], className)}
            {...props}
        >
            {children}
        </div>
    )
})

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
