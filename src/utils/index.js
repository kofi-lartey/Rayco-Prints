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
 * Send order email using EmailJS
 * @param {object} config - EmailJS configuration
 * @param {string} config.serviceId - EmailJS service ID
 * @param {string} config.templateId - EmailJS template ID
 * @param {string} config.publicKey - EmailJS public key
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
 * @returns {Promise} - EmailJS send promise
 */
export const sendOrderEmail = async (config, orderData) => {
    const { serviceId, templateId, publicKey } = config

    // Validate config
    if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing')
    }

    // Get file info from Cloudinary response
    const { format, resourceType } = orderData.fileInfo || { format: '', resourceType: '' }

    // Calculate expiry date (7 days from now)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 7)
    const expiry_date = expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    // Generate order ID
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase()

    // Prepare template parameters - keep all values as strings for EmailJS compatibility
    const templateParams = {
        from_name: orderData.clientName || 'No Name',
        phone: orderData.clientPhone || 'Not provided',
        from_email: orderData.clientEmail || 'Not provided',
        service: orderData.service || 'Not specified',
        item: orderData.item || 'Not specified',
        side: orderData.side || 'Not specified',
        color: orderData.color || 'Not specified',
        pages: String(orderData.pages || 0),
        quantity: String(orderData.quantity || 1),
        total_price: String(orderData.totalPrice || 0),
        file_url: orderData.fileUrl || '',
        voice_url: orderData.voiceUrl || '',
        file_format: (orderData.fileInfo?.format) || 'Unknown',
        resource_type: (orderData.fileInfo?.resourceType) || 'Unknown',
        message: orderData.message || 'No message',
        expiry_date: expiry_date,
        order_id: orderId
    }

    // Dynamically import emailjs to avoid issues if not installed
    const emailjs = await import('@emailjs/browser')
    return emailjs.send(serviceId, templateId, templateParams, publicKey)
}
