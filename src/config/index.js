/**
 * RaycoPrints Configuration
 * Centralized configuration for the application
 */

export const CONFIG = {
    // Brand Information
    brand: {
        name: 'RaycoPrints',
        fullName: 'Rayco Graphix & Secretarial Services',
        tagline: 'Precision Printing. Professional Results.',
        description: 'Your premier printing and secretarial services. Quality you can feel, service you can trust.',
        logo: 'https://res.cloudinary.com/djjgkezui/image/upload/v1772650253/logo_krbgmz.png'
    },

    // Contact Information
    contact: {
        phone: '+233 24 650 4887',
        whatsapp: 'https://wa.me/233246504887',
        email: 'raycoprints@gmail.com',
        address: 'Prampram - V-PUB, Ghana',
        location: {
            lat: 5.708327641251287,
            lng: 0.11070570742514928,
            address: 'Prampram - V-PUB, Ghana',
            mapsUrl: 'https://www.google.com/maps/search/Prampram+V-PUB+Ghana'
        },
        businessHours: 'Mon-Fri, 8am-6pm'
    },

    // Social Links
    social: {
        whatsapp: 'https://wa.me/233246504887',
        email: 'raycoprints@gmail.com'
    },

    // Navigation
    navItems: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Order Now', path: '/order' },
        { name: 'Contact', path: '/contact' }
    ],

    // Services
    services: [
        { id: 'photocopy', name: 'Photocopy Services', icon: '📄' },
        { id: 'printing', name: 'Printing Services', icon: '🖨️' },
        { id: 'photo', name: 'Photo Printing', icon: '📸' },
        { id: 'secretarial', name: 'Secretarial Services', icon: '✍️' },
        { id: 'passport', name: 'Passport Pictures', icon: '🪪' },
        { id: 'laminating', name: 'Laminating', icon: '🃏' },
        { id: 'envelope', name: 'Envelope Printing', icon: '✉️' },
        { id: 'dtf', name: 'DTF Printing', icon: '🎨' },
        { id: 'apparel', name: 'Custom Apparel', icon: '👕' },
        { id: 'frames', name: 'Picture Frames', icon: '🖼️' },
        { id: 'design', name: 'Graphic Design', icon: '🎯' }
    ],

    // EmailJS Configuration (to be filled by user)
    emailjs: {
        serviceId: 'service_oasu1vi',
        templateId: 'template_e213g57',
        publicKey: 'u0OLWTdAlEJucAxcQ'
    }
}

export default CONFIG
