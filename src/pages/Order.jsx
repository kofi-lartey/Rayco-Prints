import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { CONFIG } from '../config'

const Order = () => {
    const [searchParams] = useSearchParams()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
    const [prefilledMessage, setPrefilledMessage] = useState('')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [uploadedFileUrl, setUploadedFileUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    // Cloudinary configuration
    const CLOUDINARY_CLOUD_NAME = 'djjgkezui'
    const CLOUDINARY_UPLOAD_PRESET = 'Rayco_images'

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        color: '',
        pages: '',
        quantity: '',
        totalPrice: '',
        file: '',
        message: ''
    })

    // Pricing constants for calculations
    const PRICES = {
        printing: {
            bw: 1.50,
            color: 3.00
        },
        photocopy: {
            bwFront: 0.50,
            bwFB: 0.80,
            colorFront: 2.00,
            colorFB: 3.00
        }
    }

    // Calculate price automatically for photocopy services
    const calculatePrice = (color, pages, quantity, service) => {
        if (!color || !pages || !quantity || parseInt(quantity) < 1) return ''

        const numPages = parseInt(pages)
        const numQty = parseInt(quantity)

        // For photocopy services
        if (service === 'photocopy') {
            let printPrice, photoPrice

            if (color === 'black-white') {
                printPrice = PRICES.printing.bw
                photoPrice = PRICES.photocopy.bwFront
            } else { // color
                printPrice = PRICES.printing.color
                photoPrice = PRICES.photocopy.colorFront
            }

            // First copy = printing price (document needs to be printed first)
            const firstCopyPrice = numPages * printPrice
            // Remaining copies = photocopy price
            const remainingCopiesPrice = (numQty - 1) * numPages * photoPrice
            const total = firstCopyPrice + remainingCopiesPrice

            return total.toFixed(2)
        }

        return ''
    }

    // Handle form changes with auto-calculation
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => {
            const newData = { ...prev, [name]: value }
            // Auto-calculate price when relevant fields change
            if (name === 'color' || name === 'pages' || name === 'quantity' || name === 'service') {
                const price = calculatePrice(
                    name === 'service' ? prev.color : (name === 'color' ? value : prev.color),
                    name === 'service' ? prev.pages : (name === 'pages' ? value : prev.pages),
                    name === 'service' ? prev.quantity : (name === 'quantity' ? value : prev.quantity),
                    name === 'service' ? value : prev.service
                )
                if (price) {
                    newData.totalPrice = price
                }
            }
            return newData
        })
    }

    // Pre-fill form from URL parameters
    useEffect(() => {
        const service = searchParams.get('service')
        const item = searchParams.get('item')
        const price = searchParams.get('price')

        if (service) {
            // Map service titles to service values
            const serviceMap = {
                'Photocopy Services': 'photocopy',
                'Printing Services': 'printing',
                'Photo Printing': 'photo',
                'Secretarial Services': 'secretarial',
                'Passport Pictures': 'passport',
                'Laminating': 'laminating',
                'Envelope Printing': 'envelope',
                'DTF Printing': 'dtf',
                'Custom Apparel': 'apparel',
                'Picture Frames': 'frames',
                'Graphic Design': 'design',
                'Generator Rates': 'generator'
            }

            const serviceValue = serviceMap[service] || service.toLowerCase().replace(/\s+/g, '-')

            // Build pre-filled message
            let message = ''
            if (item && price) {
                message = `I'd like to order:\n- ${item}: ${price}\n\n`
            } else if (service) {
                message = `I'd like to order: ${service}\n\n`
            }
            setPrefilledMessage(message)

            setFormData(prev => ({
                ...prev,
                service: serviceValue,
                message: message
            }))
        }
    }, [searchParams])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            service: formData.service,
            color: formData.color,
            pages: formData.pages,
            quantity: formData.quantity,
            total_price: formData.totalPrice,
            file_format: formData.file,
            file_url: uploadedFileUrl || 'No file uploaded',
            message: formData.message
        }

        try {
            await emailjs.send(
                CONFIG.emailjs.serviceId,
                CONFIG.emailjs.templateId,
                templateParams,
                CONFIG.emailjs.publicKey
            )
            setSubmitStatus('success')
            setUploadedFile(null)
            setUploadedFileUrl('')
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                color: '',
                pages: '',
                quantity: '',
                totalPrice: '',
                file: '',
                message: ''
            })
        } catch (error) {
            console.error('EmailJS Error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (file) {
            setUploadedFile(file)
            setIsUploading(true)
            setUploadProgress(0)

            // Upload to Cloudinary
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

            try {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`)

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100)
                        setUploadProgress(progress)
                    }
                }

                xhr.onload = () => {
                    setIsUploading(false)
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText)
                        setUploadedFileUrl(response.secure_url)
                        setFormData({ ...formData, file: response.secure_url })
                    } else {
                        // If Cloudinary fails, just use the file name
                        setFormData({ ...formData, file: file.name })
                    }
                }

                xhr.onerror = () => {
                    setIsUploading(false)
                    // If upload fails, just use the file name
                    setFormData({ ...formData, file: file.name })
                }

                xhr.send(formData)
            } catch (error) {
                setIsUploading(false)
                setFormData({ ...formData, file: file.name })
            }
        }
    }

    const services = [
        { value: 'photocopy', label: 'Photocopy Services' },
        { value: 'printing', label: 'Printing Services' },
        { value: 'photo', label: 'Photo Printing' },
        { value: 'secretarial', label: 'Secretarial Services' },
        { value: 'passport', label: 'Passport Pictures' },
        { value: 'laminating', label: 'Laminating' },
        { value: 'envelope', label: 'Envelope Printing' },
        { value: 'dtf', label: 'DTF Printing' },
        { value: 'apparel', label: 'Custom Apparel' },
        { value: 'frames', label: 'Picture Frames' },
        { value: 'design', label: 'Graphic Design' },
        { value: 'generator', label: 'Generator Rates' },
        { value: 'business-cards', label: 'Business Cards' },
        { value: 'banners', label: 'Large Format Banners' },
        { value: 'stationery', label: 'Corporate Stationery' },
        { value: 'marketing', label: 'Marketing Materials' },
        { value: 'other', label: 'Other' }
    ]

    const fileFormats = [
        { value: '', label: 'Select file format' },
        { value: 'pdf', label: 'PDF (Preferred)' },
        { value: 'ai', label: 'AI (Adobe Illustrator)' },
        { value: 'png', label: 'High-res PNG' },
        { value: 'jpg', label: 'JPG' },
        { value: 'no-file', label: "I don't have a file yet" }
    ]

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-16 bg-gradient-to-br from-green-50 to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
                        Order Now
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Place Your <span className="gradient-text">Order</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Fill out the form below and we'll get back to you with a quote within 24 hours.
                    </p>
                </div>
            </section>

            {/* Order Options */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* WhatsApp Option */}
                        <a
                            href={CONFIG.contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">Order via WhatsApp</h3>
                                    <p className="text-white/80">Fastest response! Click to start chatting</p>
                                </div>
                            </div>
                        </a>

                        {/* Email Option */}
                        <a
                            href={`mailto:${CONFIG.contact.email}`}
                            className="block bg-gradient-to-r from-royal-500 to-royal-600 rounded-2xl p-8 text-white hover:from-royal-600 hover:to-royal-700 transition-all duration-300 hover:shadow-xl hover:shadow-royal-500/30 group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">Email Quote Request</h3>
                                    <p className="text-white/80">{CONFIG.contact.email}</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Order Form */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Quote</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                            placeholder="+233 50 000 0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Service Needed *</label>
                                        <select
                                            name="service"
                                            required
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                        >
                                            <option value="">Select a service</option>
                                            {services.map(s => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                                        <select
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                        >
                                            <option value="">Select</option>
                                            <option value="black-white">Black & White</option>
                                            <option value="color">Color</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Pages</label>
                                        <input
                                            type="number"
                                            name="pages"
                                            value={formData.pages}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                            placeholder="e.g. 2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                            placeholder="e.g. 5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Total (GHC)</label>
                                        <input
                                            type="text"
                                            name="totalPrice"
                                            value={formData.totalPrice}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all bg-slate-100"
                                            placeholder="Auto-calc"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {formData.service === 'photocopy' && formData.color && formData.pages && formData.quantity && (
                                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-xs text-blue-800">
                                            💡 Calculation: First copy (printing: {formData.color === 'black-white' ? 'GHC 1.50/page' : 'GHC 3.00/page'}) + Remaining ({parseInt(formData.quantity) - 1} copies × {formData.pages} pages × {formData.color === 'black-white' ? 'GHC 0.50' : 'GHC 2.00'}/page)
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Upload Your Document</label>
                                    <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors bg-slate-50 ${isUploading ? 'border-rayco-forest' : 'border-slate-300 hover:border-rayco-forest'}`}>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.ai,.psd,.eps,.svg"
                                            className="hidden"
                                            id="file-upload"
                                            disabled={isUploading}
                                        />
                                        <label htmlFor="file-upload" className={isUploading ? 'cursor-wait' : 'cursor-pointer'}>
                                            <div className="flex flex-col items-center">
                                                {isUploading ? (
                                                    <>
                                                        <svg className="w-12 h-12 text-rayco-forest animate-pulse mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p className="text-sm font-medium text-slate-700">Uploading... {uploadProgress}%</p>
                                                        <div className="w-48 h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                                                            <div
                                                                className="h-full bg-rayco-forest transition-all duration-300"
                                                                style={{ width: `${uploadProgress}%` }}
                                                            ></div>
                                                        </div>
                                                    </>
                                                ) : uploadedFile ? (
                                                    <>
                                                        <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <p className="text-sm font-medium text-slate-700">{uploadedFile.name}</p>
                                                        <p className="text-xs text-slate-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                                                        <p className="text-xs text-rayco-forest mt-1">Click to change</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-12 h-12 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <p className="text-sm font-medium text-slate-700">Click to upload your file</p>
                                                        <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX, PNG, JPG, AI, PSD, EPS, SVG</p>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                    {uploadedFile && !isUploading && (
                                        <p className="text-xs text-rayco-forest mt-1">✓ File uploaded: {uploadedFile.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Or Select File Format</label>
                                    <select
                                        name="file"
                                        value={formData.file}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all"
                                    >
                                        {fileFormats.map(f => (
                                            <option key={f.value} value={f.value}>{f.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Details</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-royal-500 focus:ring-2 focus:ring-royal-200 outline-none transition-all resize-none"
                                        placeholder="Any special requirements, dimensions, or questions..."
                                    ></textarea>
                                    {prefilledMessage && !formData.message && (
                                        <p className="text-xs text-rayco-forest mt-1">✓ Pre-filled from your selection on Services page</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-rayco-forest text-white py-4 rounded-lg font-bold text-lg hover:bg-rayco-sage transition-all duration-300 hover:shadow-lg hover:shadow-rayco-forest/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Quote Request'}
                                </button>

                                {submitStatus === 'success' && (
                                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                                        ✓ Quote request sent successfully! We'll get back to you within 24 hours.
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                                        ✗ Failed to send request. Please try again or contact us directly via WhatsApp or email.
                                    </div>
                                )}

                                <p className="text-center text-slate-500 text-sm">
                                    We'll respond within 24 hours
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Order
