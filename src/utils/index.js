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

/**
 * Detect file type from URL
 * @param {string} fileUrl - URL of the file
 * @returns {object} - Object with isImage and isPDF flags
 */
export const detectFileType = (fileUrl) => {
    const fileExtension = fileUrl ? fileUrl.split('.').pop().toLowerCase() : '';
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
    return {
        isImage: imageExtensions.includes(fileExtension),
        isPDF: fileExtension === 'pdf'
    };
}

/**
 * Send order email via Netlify function (uses Mailjet)
 * @param {object} config - Configuration object (kept for compatibility)
 * @param {object} orderData - Order data to send
 * @param {string} orderData.clientName - Client's name
 * @param {string} orderData.clientEmail - Client's email
 * @param {string} orderData.clientPhone - Client's phone
 * @param {string} orderData.service - Service type
 * @param {string} orderData.item - Item/specific option
 * @param {string} orderData.side - Side (Front/Front & Back)
 * @param {string} orderData.color - Color option
 * @param {number|string} orderData.pages - Number of pages
 * @param {number|string} orderData.quantity - Quantity
 * @param {number|string} orderData.totalPrice - Total price
 * @param {string} orderData.fileUrl - Uploaded file URL
 * @param {string} orderData.message - Additional message
 * @returns {Promise} - Netlify function response
 */
export const sendOrderEmail = async (config, orderData) => {
    // Prepare data for Netlify function (Mailjet)
    const emailData = {
        name: orderData.clientName,
        email: orderData.clientEmail,
        phone: orderData.clientPhone,
        service: orderData.service,
        item: orderData.item,
        side: orderData.side,
        color: orderData.color,
        pages: orderData.pages,
        quantity: orderData.quantity,
        totalPrice: orderData.totalPrice,
        fileUrl: orderData.fileUrl,
        voiceUrl: orderData.voiceUrl,
        fileInfo: orderData.fileInfo,
        message: orderData.message
    }

    // Call Netlify function which uses Mailjet
    const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to send email')
    }

    return response.json()
}
