/**
 * Utility Functions
 * Reusable helper functions for the application
 */

/**
 * Generate a mailto link from form data
 * @param {string} email - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} body - Email body content
 * @returns {string} - Generated mailto link
 */
export const generateMailtoLink = (email, subject, body) => {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Generate WhatsApp message link
 * @param {string} phoneNumber - WhatsApp phone number
 * @param {string} message - Message to send
 * @returns {string} - Generated WhatsApp link
 */
export const generateWhatsAppLink = (phoneNumber, message) => {
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Format price with currency
 * @param {number|string} price - Price value
 * @param {string} currency - Currency symbol
 * @returns {string} - Formatted price
 */
export const formatPrice = (price, currency = 'GHC') => {
    if (typeof price === 'string') return price
    return `${currency} ${price.toFixed(2)}`
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Is valid phone number
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-+()]+$/
    return phone && phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Scroll to element by ID
 * @param {string} elementId - Element ID to scroll to
 */
export const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

/**
 * Get current year
 * @returns {number} - Current year
 */
export const getCurrentYear = () => {
    return new Date().getFullYear()
}

/**
 * Class name helper (similar to clsx)
 * @param {...string|object|Array} args - Classes to combine
 * @returns {string} - Combined class names
 */
export const cn = (...args) => {
    return args
        .flat()
        .filter(x => x)
        .join(' ')
        .trim()
}
