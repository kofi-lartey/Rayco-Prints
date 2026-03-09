import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input, Button, Select, Textarea } from '../components/ui'
import { CONFIG } from '../config'
import { sendOrderEmail } from '../utils'

const heroImages = [
    "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop"
]

export default function Order() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    // Pre-filled service from URL
    const prefillService = searchParams.get('service') || ''
    const prefillItem = searchParams.get('item') || ''
    const prefillPrice = searchParams.get('price') || ''

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: prefillService,
        item: prefillItem,
        side: '',
        color: '',
        pages: '',
        quantity: '',
        totalPrice: prefillPrice,
        file: '',
        message: ''
    })

    const [uploadedFile, setUploadedFile] = useState(null)
    const [uploadedFileUrl, setUploadedFileUrl] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [filePreview, setFilePreview] = useState(null)
    const [isFileUploaded, setIsFileUploaded] = useState(false)
    const [fileInfo, setFileInfo] = useState({ format: '', resourceType: '' })

    // Voice recording states
    const [isRecording, setIsRecording] = useState(false)
    const [recordedAudioUrl, setRecordedAudioUrl] = useState('')
    const [recordingDuration, setRecordingDuration] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [audioBlob, setAudioBlob] = useState(null)

    // Use refs for media recorder to persist across renders
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const durationIntervalRef = useRef(null)
    const streamRef = useRef(null)

    // Check if it's a secretarial service
    const isSecretarial = formData.service?.toLowerCase().includes('secretarial') || formData.service === 'Secretarial Services'

    // Check if it's a photocopy service
    const isPhotocopy = formData.service?.toLowerCase().includes('photocopy') || formData.service === 'Photocopy'
    const isPrinting = formData.service?.toLowerCase().includes('printing') || formData.service === 'Printing'
    const isTshirts = formData.service?.toLowerCase().includes('t-shirts') || formData.service === 'T-Shirts and Jersey'

    // Determine color and side from item name if price was passed
    useEffect(() => {
        if (prefillItem) {
            const isColored = prefillItem.toLowerCase().includes('colour') || prefillItem.toLowerCase().includes('color')
            const isBW = prefillItem.toLowerCase().includes('b&w') || prefillItem.toLowerCase().includes('black')

            if (isColored) {
                setFormData(prev => ({ ...prev, color: 'Coloured on White' }))
            } else if (isBW) {
                setFormData(prev => ({ ...prev, color: 'B&W on White' }))
            }

            // Determine side (Front or Front & Back)
            if (prefillItem.toLowerCase().includes('f&b') || prefillItem.toLowerCase().includes('front and back')) {
                if (prefillItem.toLowerCase().includes('a3')) {
                    setFormData(prev => ({ ...prev, side: 'A3 Front & Back' }))
                } else {
                    setFormData(prev => ({ ...prev, side: 'A4 Front & Back' }))
                }
            } else {
                if (prefillItem.toLowerCase().includes('a3')) {
                    setFormData(prev => ({ ...prev, side: 'A3 Front' }))
                } else {
                    setFormData(prev => ({ ...prev, side: 'A4 Front' }))
                }
            }
        }
    }, [prefillItem])

    // Calculate price for photocopy services
    // For A4/A3 photocopies ordered via website: first document = printing price, remaining = photocopy price
    const calculatePrice = () => {
        const qty = parseInt(formData.quantity) || 1
        const pages = parseInt(formData.pages) || 1

        // Determine size, color, and side from prefillItem or formData
        const isA3 =
            prefillItem?.toLowerCase().includes('a3') ||
            formData.item?.toLowerCase().includes('a3') ||
            formData.side?.toLowerCase().includes('a3')

        const isColored =
            prefillItem?.toLowerCase().includes('colour') ||
            prefillItem?.toLowerCase().includes('color') ||
            formData.color?.toLowerCase().includes('coloured') ||
            formData.color?.toLowerCase().includes('color')

        const isFB =
            prefillItem?.toLowerCase().includes('f&b') ||
            formData.side?.toLowerCase().includes('front & back')

        // Photocopy prices from Services.jsx
        let photocopyPrice = 0.50 // Default A4 B&W Front
        if (isA3) {
            photocopyPrice = isColored ? 3.00 : 1.50
        } else {
            if (isColored) {
                photocopyPrice = isFB ? 3.00 : 2.00
            } else {
                photocopyPrice = isFB ? 0.80 : 0.50
            }
        }

        // Printing prices from Services.jsx
        let printingPrice = 1.50 // Default A4 B&W
        if (isA3) {
            printingPrice = isColored ? 4.00 : 3.00
        } else {
            printingPrice = isColored ? 3.00 : 1.50
        }

        // Calculate total: first document = printing price × pages, remaining = photocopy price × pages
        if (isPhotocopy && qty > 0 && pages > 0) {
            // First document (printed) - all pages printed
            const firstDocPrice = printingPrice * pages
            const remainingQty = Math.max(0, qty - 1) // Remaining copies
            const remainingPrice = photocopyPrice * remainingQty * pages

            const total = firstDocPrice + remainingPrice
            return total.toFixed(2)
        }

        // For printing: just multiply
        if (isPrinting && qty > 0) {
            const total = printingPrice * qty * pages
            return total.toFixed(2)
        }

        // Secretarial Services pricing - price per page based on item
        if (isSecretarial) {
            // Base price for secretarial work (typing per page)
            let typingPrice = 2.00 // Default per page

            // Check if it's CV writing (usually more expensive)
            if (formData.item?.toLowerCase().includes('cv') || formData.item?.toLowerCase().includes('resume')) {
                typingPrice = 50.00 // CV writing is more expensive
            } else if (formData.item?.toLowerCase().includes('online application')) {
                typingPrice = 20.00 // Online application per submission
            } else {
                // Regular typing - price per page
                typingPrice = 2.00
            }

            // Calculate total: typing price × pages × quantity
            const typingPages = parseInt(formData.pages) || 1
            const total = typingPrice * typingPages * qty
            return total.toFixed(2)
        }

        // If no quantity/pages yet, show base printing price as reference
        if (isPhotocopy) {
            return printingPrice.toFixed(2)
        }

        return ''
    }

    useEffect(() => {
        const price = calculatePrice()
        if (price) {
            setFormData(prev => ({ ...prev, totalPrice: price }))
        }
    }, [formData.pages, formData.quantity, formData.color, formData.service, formData.side, prefillPrice, formData.item])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/bmp']

            if (!allowedTypes.includes(file.type)) {
                alert('Please upload a valid file: PDF, DOC, DOCX, PNG, or JPG')
                return
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB')
                return
            }

            setUploadedFile(file)
            setIsFileUploaded(true)

            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    setFilePreview(e.target.result)
                }
                reader.readAsDataURL(file)
            } else {
                setFilePreview(null)
            }

            uploadFile(file)
        }
    }

    // Upload file to Cloudinary
    // To fix 401 error: 1) Go to cloudinary.com, 2) Create free account, 3) Go to Settings > Upload, 4) Add upload preset (name it 'Rayco_images'), 5) Make sure 'Signed' is OFF
    const uploadFile = async (file) => {
        setUploadProgress(0)

        const cloudName = 'djjgkezui' // Your Cloudinary cloud name
        const uploadPreset = 'Rayco_images' // Your upload preset

        const formDataCloud = new FormData()
        formDataCloud.append('file', file)
        formDataCloud.append('upload_preset', uploadPreset)
        formDataCloud.append('resource_type', 'auto')

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                {
                    method: 'POST',
                    body: formDataCloud
                }
            )

            const data = await response.json()

            console.log('Cloudinary response status:', response.status)
            console.log('Cloudinary response:', data)

            if (!response.ok) {
                alert(`Upload failed: ${data.error?.message || 'Unknown error'}`)
                return
            }

            if (data.secure_url) {
                setUploadedFileUrl(data.secure_url)
                setUploadProgress(100)
                // Store file info from Cloudinary response
                setFileInfo({
                    format: data.format || '',
                    resourceType: data.resource_type || ''
                })
                // Keep local file preview - Cloudinary URLs may require authentication to view
                // The uploaded URL is still saved and sent with the form
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload file. Please try again.')
        }
    }

    // Voice Recording Functions
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream
            mediaRecorderRef.current = new MediaRecorder(stream)
            audioChunksRef.current = []

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data)
            }

            mediaRecorderRef.current.onstop = async () => {
                setIsUploading(true)

                // Create blob with webm format for browser compatibility
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                setAudioBlob(audioBlob)

                // Upload to Cloudinary FIRST, then use the returned URL
                await uploadVoice(audioBlob)

                setIsUploading(false)

                // Stop all tracks
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop())
                }
            }

            mediaRecorderRef.current.start()
            setIsRecording(true)

            // Update duration every second
            durationIntervalRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1)
            }, 1000)
        } catch (error) {
            console.error('Error starting recording:', error)
            alert('Could not access microphone. Please check permissions.')
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            if (durationIntervalRef.current) {
                clearInterval(durationIntervalRef.current)
            }
        }
    }

    const uploadVoice = async (blob) => {
        const cloudName = 'djjgkezui'
        const uploadPreset = 'Rayco_images'

        const formDataCloud = new FormData()
        formDataCloud.append('file', blob)
        formDataCloud.append('upload_preset', uploadPreset)
        formDataCloud.append('resource_type', 'auto') // Use auto to accept audio files

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                {
                    method: 'POST',
                    body: formDataCloud
                }
            )

            const data = await response.json()

            if (data.secure_url) {
                setRecordedAudioUrl(data.secure_url)
                setFileInfo({
                    format: 'audio',
                    resourceType: 'video'
                })
            }
        } catch (error) {
            console.error('Voice upload error:', error)
        }
    }

    const { contact, emailjs: emailConfig } = CONFIG

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        // Prepare order data
        const orderData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            item: formData.item,
            side: formData.side,
            color: formData.color,
            pages: formData.pages,
            quantity: formData.quantity,
            totalPrice: formData.totalPrice,
            fileUrl: uploadedFileUrl,
            voiceUrl: recordedAudioUrl,
            fileInfo: fileInfo,
            message: formData.message,
            timestamp: new Date().toISOString()
        }

        // Check if EmailJS is configured
        if (emailConfig.serviceId === 'YOUR_SERVICE_ID' ||
            emailConfig.templateId === 'YOUR_TEMPLATE_ID' ||
            emailConfig.publicKey === 'YOUR_PUBLIC_KEY') {
            // Fallback to mailto if not configured
            const subject = `New Order: ${formData.name} - ${formData.service}`
            const body = `NEW ORDER - Rayco Prints

CLIENT DETAILS
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

SERVICE
Service: ${formData.service}
Item: ${formData.item}
Color: ${formData.color}
Pages: ${formData.pages}
Quantity: ${formData.quantity}

TOTAL: GHC ${formData.totalPrice}

MESSAGE:
${formData.message}`
            window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            setSubmitStatus('success')
            navigate('/success')
            setIsSubmitting(false)
            return
        }

        try {
            // Prepare order data in the format expected by sendOrderEmail
            const orderData = {
                clientName: formData.name,
                clientEmail: formData.email,
                clientPhone: formData.phone,
                service: formData.service,
                item: formData.item,
                side: formData.side,
                color: formData.color,
                pages: formData.pages,
                quantity: formData.quantity,
                totalPrice: formData.totalPrice,
                fileUrl: uploadedFileUrl,
                voiceUrl: recordedAudioUrl,
                fileInfo: fileInfo,
                message: formData.message
            }

            // Send email using the utility function
            await sendOrderEmail(emailConfig, orderData)

            setSubmitStatus('success')
            navigate('/success')
        } catch (emailError) {
            console.error('EmailJS Error:', emailError)
            // Fallback to mailto on error
            const subject = `New Order: ${formData.name} - ${formData.service}`
            const body = `NEW ORDER - Rayco Prints

CLIENT DETAILS
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

SERVICE
Service: ${formData.service}
Item: ${formData.item}
Color: ${formData.color}
Pages: ${formData.pages}
Quantity: ${formData.quantity}

TOTAL: GHC ${formData.totalPrice}

MESSAGE:
${formData.message}`
            window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            setSubmitStatus('success')
            navigate('/success')
        } finally {
            setIsSubmitting(false)
            setUploadedFile(null)
            setUploadedFileUrl('')
            setFilePreview(null)
            setIsFileUploaded(false)
            setFileInfo({ format: '', resourceType: '' })
            // Reset voice recording
            setRecordedAudioUrl('')
            setAudioBlob(null)
            setRecordingDuration(0)
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                item: '',
                side: '',
                color: '',
                pages: '',
                quantity: '',
                totalPrice: '',
                file: '',
                message: ''
            })
        }
    }

    // Show NB note for Photocopy service
    const showNB = isPhotocopy

    return (
        <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
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

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Place Your Order</h1>
                    <p className="text-neutral-200">Fill in the details below and we'll get started on your order</p>
                </div>

                {/* Netlify Forms hidden input */}
                <input type="hidden" name="form-name" value="orders" />

                <form onSubmit={handleSubmit} data-netlify="true" className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-soft-lg border border-white/20 p-8 space-y-6">
                    {/* Selected Service Display */}
                    {formData.service && (
                        <div className="bg-primary-500/20 border border-primary-400/30 rounded-xl p-4 backdrop-blur-sm">
                            <p className="text-sm text-white">
                                <strong>Selected Service:</strong> {formData.service}
                                {formData.item && <> - {formData.item}</>}
                            </p>
                        </div>
                    )}

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                        </label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                        </label>
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+233 XX XXX XXXX"
                        />
                    </div>

                    {/* Service Selection */}
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Service *
                        </label>
                        <Select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select a Service --</option>
                            <option value="Photocopy Services">Photocopy Services</option>
                            <option value="Printing Services">Printing Services</option>
                            <option value="Photo Printing">Photo Printing</option>
                            <option value="Secretarial Services">Secretarial Services</option>
                            <option value="Passport Pictures">Passport Pictures</option>
                            <option value="Laminating">Laminating</option>
                            <option value="Envelope Printing">Envelope Printing</option>
                            <option value="DTF Printing">DTF Printing</option>
                            <option value="T-Shirts and Jersey">T-Shirts and Jersey</option>
                            <option value="Picture Frames">Picture Frames</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Generator Rates">Generator Rates</option>
                        </Select>
                    </div>

                    {/* Item/Specific Option (pre-filled from URL) */}
                    {formData.item ? (
                        <div>
                            <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
                                Specific Option
                            </label>
                            <Input
                                type="text"
                                id="item"
                                name="item"
                                value={formData.item}
                                onChange={handleChange}
                                readOnly
                                className="bg-gray-100"
                            />
                        </div>
                    ) : (
                        /* Show item dropdown when coming from main order page */
                        !prefillItem && (isPhotocopy || isPrinting) && (
                            <div>
                                <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Option
                                </label>
                                <Select
                                    id="item"
                                    name="item"
                                    value={formData.item}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Option --</option>
                                    {isPhotocopy && (
                                        <>
                                            <option value="A4 Photocopy - B&W Front">A4 Photocopy - B&W Front</option>
                                            <option value="A4 Photocopy - B&W (F&B)">A4 Photocopy - B&W (Front & Back)</option>
                                            <option value="A4 Photocopy - Colour Front">A4 Photocopy - Colour Front</option>
                                            <option value="A4 Photocopy - Colour (F&B)">A4 Photocopy - Colour (Front & Back)</option>
                                            <option value="A3 Photocopy - B&W Front">A3 Photocopy - B&W Front</option>
                                            <option value="A3 Photocopy - Colour Front">A3 Photocopy - Colour Front</option>
                                        </>
                                    )}
                                    {isPrinting && (
                                        <>
                                            <option value="A4 Printing - B&W">A4 Printing - B&W</option>
                                            <option value="A4 Printing - Colour">A4 Printing - Colour</option>
                                            <option value="A3 Printing - B&W">A3 Printing - B&W</option>
                                            <option value="A3 Printing - Colour">A3 Printing - Colour</option>
                                        </>
                                    )}
                                </Select>
                            </div>
                        )
                    )}

                    {/* NB Note for Photocopy */}
                    {showNB && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <strong>NB:</strong> For photocopy orders via website, the first document will be printed first (printing charges apply) then photocopied for remaining copies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Paper Size Selection (for Photocopy) */}
                    {isPhotocopy && (
                        <div>
                            <label htmlFor="side" className="block text-sm font-medium text-gray-700 mb-1">
                                Paper Size & Side *
                            </label>
                            <Select
                                id="side"
                                name="side"
                                value={formData.side}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Size & Side --</option>
                                <option value="A4 Front">A4 - Front Only</option>
                                <option value="A4 Front & Back">A4 - Front & Back</option>
                                <option value="A3 Front">A3 - Front Only</option>
                                <option value="A3 Front & Back">A3 - Front & Back</option>
                            </Select>
                        </div>
                    )}

                    {/* Color Selection (for Photocopy and Printing) */}
                    {(isPhotocopy || isPrinting) && (
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                                Color Preference *
                            </label>
                            <Select
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Color --</option>
                                {isPhotocopy ? (
                                    <>
                                        <option value="B&W on White">Black & White on White Paper</option>
                                        <option value="Coloured on White">Coloured on White Paper</option>
                                        <option value="B&W on Coloured">Black & White on Coloured Paper</option>
                                        <option value="Coloured on Coloured">Coloured on Coloured Paper</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="Black & White">Black & White</option>
                                        <option value="Colored">Colored</option>
                                    </>
                                )}
                            </Select>
                        </div>
                    )}

                    {/* Pages (for Photocopy) */}
                    {isPhotocopy && (
                        <div>
                            <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Pages *
                            </label>
                            <Input
                                type="number"
                                id="pages"
                                name="pages"
                                value={formData.pages}
                                onChange={handleChange}
                                min="1"
                                placeholder="Total number of pages"
                            />
                        </div>
                    )}

                    {/* Quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity *
                        </label>
                        <Input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="1"
                            placeholder="Number of copies"
                        />
                    </div>

                    {/* File Upload or Voice Recording */}
                    {!isTshirts && (
                    isSecretarial ? (
                        // Voice Recording + File Upload for Secretarial Services
                        <div className="space-y-6">
                            {/* Voice Recording Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Option 1: Record Voice Note
                                </label>
                                <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    {!recordedAudioUrl && !isUploading ? (
                                        <div className="text-center">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" fill="currentColor" />
                                                <path d="M19 10v2a7 7 0 01-14 0v-2m7 9v3m-3-18v18m3-15h6m-6 0H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-600">
                                                Record your voice message
                                            </p>
                                            <p className="text-xs text-gray-500 mb-4">
                                                Tell us what you need typed
                                            </p>

                                            {!isRecording ? (
                                                <button
                                                    type="button"
                                                    onClick={startRecording}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center mx-auto"
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                    </svg>
                                                    Start Recording
                                                </button>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2">
                                                        <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                                                    </div>
                                                    <p className="text-red-500 font-medium mb-2">Recording... {recordingDuration}s</p>
                                                    <button
                                                        type="button"
                                                        onClick={stopRecording}
                                                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                                                    >
                                                        Stop Recording
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : isUploading ? (
                                        <div className="text-center py-4">
                                            <svg className="animate-spin mx-auto h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-600">
                                                Uploading to cloud...
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center w-full">
                                            <audio
                                                controls
                                                src={recordedAudioUrl}
                                                className="w-full mb-4"
                                            />
                                            <p className="text-sm text-green-600 font-medium mb-2">✓ Voice recorded!</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRecordedAudioUrl('')
                                                    setAudioBlob(null)
                                                    setRecordingDuration(0)
                                                    setFileInfo({ format: '', resourceType: '' })
                                                }}
                                                className="text-sm text-red-500 hover:text-red-700"
                                            >
                                                Remove recording
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* OR Divider */}
                            <div className="flex items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* File Upload Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Option 2: Upload Document (Photo/Scan of handwritten notes)
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
                                    <div className="space-y-1 text-center">
                                        {!uploadedFile ? (
                                            <>
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600 justify-center">
                                                    <label htmlFor="file-upload-secretarial" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload-secretarial" name="file-upload-secretarial" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.webp,.bmp" />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF, DOC, Images up to 10MB</p>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                {filePreview ? (
                                                    <img src={filePreview} alt="Preview" className="max-h-48 rounded-lg shadow-md mb-3" />
                                                ) : (
                                                    <div className="mb-3 p-4 bg-blue-50 rounded-lg">
                                                        <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <p className="text-sm text-green-600 font-medium">{uploadedFile.name}</p>
                                                <button type="button" onClick={() => { setUploadedFile(null); setUploadedFileUrl(''); setFilePreview(null); setIsFileUploaded(false); }} className="mt-2 text-sm text-red-500">Remove file</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <p className="mt-2 text-xs text-gray-500 text-center">
                                Or describe what you need in the message box below
                            </p>
                        </div>
                    ) : (
                        // Regular File Upload
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                                Upload File (Optional)
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
                                <div className="space-y-1 text-center">
                                    {uploadedFile ? (
                                        <div className="flex flex-col items-center">
                                            {filePreview ? (
                                                <div className="mb-3">
                                                    <img
                                                        src={filePreview}
                                                        alt="Preview"
                                                        className="max-h-48 rounded-lg shadow-md"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="mb-3 p-4 bg-blue-50 rounded-lg">
                                                    <svg className="w-12 h-12 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <p className="text-sm text-green-600 font-medium">{uploadedFile.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {(uploadedFile.size / 1024).toFixed(1)} KB
                                            </p>
                                            {uploadProgress < 100 && (
                                                <p className="text-blue-600 text-sm mt-1">Uploading... {uploadProgress}%</p>
                                            )}
                                            {uploadProgress === 100 && uploadedFileUrl && (
                                                <p className="text-green-600 text-sm mt-1">✓ File uploaded successfully!</p>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUploadedFile(null)
                                                    setUploadedFileUrl('')
                                                    setFilePreview(null)
                                                    setIsFileUploaded(false)
                                                }}
                                                className="mt-2 text-sm text-red-500 hover:text-red-700"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.webp,.bmp"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                PDF, DOC, DOCX, PNG, JPG up to 10MB
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* File Preview Section */}
                    {uploadedFile && !isSecretarial && !isTshirts && (
                        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-blue-900">📎 File Preview</h3>
                                <span className="text-sm text-green-600 font-bold">✓ File attached</span>
                            </div>

                            {/* Image Preview */}
                            {filePreview ? (
                                <div className="flex flex-col items-center">
                                    <div className="mb-3 p-2 bg-white rounded-lg shadow">
                                        <img
                                            src={filePreview}
                                            alt="File preview"
                                            className="max-h-72 rounded-lg"
                                        />
                                    </div>
                                    <p className="text-sm font-bold text-gray-800">
                                        📄 {uploadedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(uploadedFile.size / 1024).toFixed(1)} KB • {uploadedFile.type.split('/')[1]?.toUpperCase() || 'IMAGE'}
                                    </p>
                                </div>
                            ) : uploadedFile.type === 'application/pdf' ? (
                                /* PDF Preview */
                                <div className="flex flex-col items-center">
                                    <div className="mb-3 w-full bg-white rounded-lg shadow overflow-hidden">
                                        <iframe
                                            src={URL.createObjectURL(uploadedFile)}
                                            title="PDF Preview"
                                            className="w-full h-96 rounded-lg"
                                        />
                                    </div>
                                    <p className="text-sm font-bold text-gray-800">
                                        📄 {uploadedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(uploadedFile.size / 1024).toFixed(1)} KB • PDF Document
                                    </p>
                                </div>
                            ) : (
                                /* Document Preview (Word, etc) */
                                <div className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200">
                                    <div className="flex-shrink-0">
                                        <svg className="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-bold text-gray-900">{uploadedFile.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {(uploadedFile.size / 1024).toFixed(1)} KB • {uploadedFile.type.includes('pdf') ? 'PDF Document' : uploadedFile.type.includes('word') ? 'Word Document' : 'Document'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-gray-600 mt-4 text-center bg-yellow-50 p-2 rounded">
                                ⚠️ Please verify this is the correct file before submitting your order
                            </p>
                        </div>
                    )}

                    {/* Total Price Display */}
                    {formData.totalPrice && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-green-800 font-medium">Estimated Total:</span>
                                <span className="text-2xl font-bold text-green-600">
                                    GHC {formData.totalPrice}
                                </span>
                            </div>
                            {isPhotocopy && formData.quantity && (
                                <div className="mt-2 text-sm text-green-600 border-t border-green-200 pt-2">
                                    <p>First doc (printed): GHC {(parseFloat(formData.totalPrice) > 0 ? (1.5 * (parseInt(formData.pages) || 1)).toFixed(2) : '0.00')}</p>
                                    <p>+ Photocopies: GHC {(Math.max(0, parseFloat(formData.totalPrice) - (1.5 * (parseInt(formData.pages) || 1)))).toFixed(2)}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Notes (Optional)
                        </label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Any special instructions or details we should know..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Order'}
                        </Button>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <p className="text-green-800">Order submitted successfully! We'll contact you soon.</p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <p className="text-red-800">Failed to submit order. Please try again or contact us directly.</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
