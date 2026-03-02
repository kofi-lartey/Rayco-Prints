/**
 * Custom Hooks
 * Reusable React hooks for the application
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * Hook for handling mobile menu state
 * @returns {object} - Menu state and toggle function
 */
export const useMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const closeMenu = useCallback(() => {
        setIsOpen(false)
    }, [])

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false)
    }, [])

    // Close menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return { isOpen, toggleMenu, closeMenu }
}

/**
 * Hook for handling form state
 * @param {object} initialState - Initial form state
 * @returns {object} - Form state and handlers
 */
export const useForm = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }))
        }
    }, [errors])

    const resetForm = useCallback(() => {
        setFormData(initialState)
        setErrors({})
    }, [initialState])

    const setFieldError = useCallback((field, error) => {
        setErrors(prev => ({ ...prev, [field]: error }))
    }, [])

    return { formData, setFormData, errors, handleChange, resetForm, setFieldError }
}

/**
 * Hook for scroll handling
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} - Is scrolled past threshold
 */
export const useScroll = (threshold = 50) => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial state

        return () => window.removeEventListener('scroll', handleScroll)
    }, [threshold])

    return isScrolled
}

/**
 * Hook for loading state
 * @returns {object} - Loading state and handlers
 */
export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const startLoading = useCallback(() => {
        setIsLoading(true)
        setError(null)
    }, [])

    const stopLoading = useCallback(() => {
        setIsLoading(false)
    }, [])

    const setLoadingError = useCallback((errorMessage) => {
        setError(errorMessage)
        setIsLoading(false)
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return { isLoading, error, startLoading, stopLoading, setLoadingError, clearError }
}

/**
 * Hook for local storage
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @returns {Array} - Value and setValue function
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    return [storedValue, setValue]
}

/**
 * Hook for media query
 * @param {string} query - Media query string
 * @returns {boolean} - Does media query match
 */
export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }

        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener)

        return () => media.removeEventListener('change', listener)
    }, [matches, query])

    return matches
}
