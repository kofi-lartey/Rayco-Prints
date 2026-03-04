import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
import { useForm, useLoading } from '../hooks'
import { Button, Input, Textarea, Card } from '../components/ui'
import { CONFIG } from '../config'
import { generateWhatsAppLink, isValidEmail, isValidPhone } from '../utils'

const heroImages = [
    "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop"
]

/**
 * Contact Page
 * Modern, elegant contact form with email.js integration
 */
const Contact = () => {
    const formRef = useRef()
    const [currentSlide, setCurrentSlide] = useState(0)
    const { formData, handleChange, resetForm } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const { isLoading, error, startLoading, stopLoading, setLoadingError, clearError } = useLoading()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const { contact, emailjs: emailConfig } = CONFIG

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Phone",
            value: contact.phone,
            description: contact.businessHours
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email",
            value: contact.email,
            description: "We'll respond within 24 hours"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Location",
            value: contact.address,
            description: "Visit our shop during business hours",
            link: contact.location?.mapsUrl
        }
    ]

    const validateForm = () => {
        if (!formData.name.trim()) {
            setLoadingError('Please enter your name')
            return false
        }
        if (!formData.email.trim() || !isValidEmail(formData.email)) {
            setLoadingError('Please enter a valid email address')
            return false
        }
        if (!formData.message.trim()) {
            setLoadingError('Please enter your message')
            return false
        }
        if (formData.phone && !isValidPhone(formData.phone)) {
            setLoadingError('Please enter a valid phone number')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        clearError()

        if (!validateForm()) return

        // If email.js is not configured, fall back to mailto
        if (emailConfig.serviceId === 'YOUR_SERVICE_ID' ||
            emailConfig.templateId === 'YOUR_TEMPLATE_ID' ||
            emailConfig.publicKey === 'YOUR_PUBLIC_KEY') {
            // Fallback to mailto
            const subject = formData.subject || `Contact from ${formData.name}`
            const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
            window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            setSuccess(true)
            return
        }

        startLoading()

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                subject: formData.subject || 'No subject',
                message: formData.message
            }

            await emailjs.send(
                emailConfig.serviceId,
                emailConfig.templateId,
                templateParams,
                emailConfig.publicKey
            )

            setSuccess(true)
            resetForm()
        } catch (err) {
            console.error('EmailJS Error:', err)
            // Fallback to mailto on error
            const subject = formData.subject || `Contact from ${formData.name}`
            const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
            window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            setSuccess(true)
        } finally {
            stopLoading()
        }
    }

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-16 relative overflow-hidden">
                {/* Background Carousel */}
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-neutral-900/70"></div>
                        </div>
                    ))}
                    {/* Slide Navigation Dots */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-white w-8'
                                    : 'bg-white/40 hover:bg-white/60 w-2'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                        Contact Us
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                        Get In <span className="gradient-text-primary">Touch</span>
                    </h1>
                    <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-8">Let's Connect</h2>

                            <div className="space-y-6 mb-8">
                                {contactInfo.map((info, index) => (
                                    <Card key={index} className="p-6 flex items-start gap-4 animate-fade-in-up" hover style={{ animationDelay: `${index * 100}ms` }}>
                                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 shrink-0">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-semibold text-neutral-900">{info.title}</h3>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-neutral-600 hover:text-primary-500 underline"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-neutral-600">{info.value}</p>
                                            )}
                                            <p className="text-neutral-500 text-sm">{info.description}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* WhatsApp Button */}
                            <a
                                href={contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span>Chat on WhatsApp</span>
                            </a>

                            {/* Map Placeholder */}
                            {/* Interactive Map */}
                            <div className="mt-8 overflow-hidden rounded-2xl shadow-inner border border-neutral-100 h-80 w-full">
                                <iframe
                                    title="Store Location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://maps.google.com/maps?q=${contact.location?.lat || 5.708327641251287},${contact.location?.lng || 0.11070570742514928}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    className="grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="p-8 animate-fade-in-up" padding="lg" style={{ animationDelay: '200ms' }}>
                            <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-6">Send us a Message</h3>

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
                                    <p className="font-medium">Thank you! Your message has been sent.</p>
                                    <p className="text-sm">We'll get back to you within 24 hours.</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                                    <p>{error}</p>
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                                    <Input
                                        label="Full Name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                    />
                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <Input
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder={contact.phone}
                                    />
                                    <Input
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <Textarea
                                    label="Message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us more about what you need..."
                                />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    isLoading={isLoading}
                                >
                                    Send Message
                                </Button>

                                <p className="text-center text-neutral-500 text-sm">
                                    We'll get back to you within 24 hours
                                </p>
                            </form>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
