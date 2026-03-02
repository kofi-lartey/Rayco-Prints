import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input, Button, Select, Textarea } from '../components/ui'

export default function Order() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

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

    // Check if it's a photocopy service
    const isPhotocopy = formData.service?.toLowerCase().includes('photocopy') || formData.service === 'Photocopy'
    const isPrinting = formData.service?.toLowerCase().includes('printing') || formData.service === 'Printing'

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
                setUploadedFileUrl(data.secure_url)
                setUploadProgress(100)
                // Keep local file preview - Cloudinary URLs may require authentication to view
                // The uploaded URL is still saved and sent with the form
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload file. Please try again.')
        }
    }

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
            message: formData.message,
            timestamp: new Date().toISOString()
        }

        // Try Netlify Forms first (works on production)
        const form = e.target
        const formDataSubmit = new FormData(form)

        // Add the uploaded file URL if available
        if (uploadedFileUrl) {
            formDataSubmit.append('file_url', uploadedFileUrl)
        }

        try {
            // Try to use Netlify Function for form submission
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })

            if (response.ok) {
                setSubmitStatus('success')
                navigate('/success')
            } else {
                throw new Error('Netlify function failed')
            }
        } catch (netlifyError) {
            // Fallback: Save to localStorage for local development
            console.log('Netlify function failed, using local fallback:', netlifyError)

            // Get existing orders from localStorage
            const existingOrders = JSON.parse(localStorage.getItem('rayco_orders') || '[]')
            existingOrders.push(orderData)
            localStorage.setItem('rayco_orders', JSON.stringify(existingOrders))

            setSubmitStatus('success')
            navigate('/success')
        } finally {
            setIsSubmitting(false)
            setUploadedFile(null)
            setUploadedFileUrl('')
            setFilePreview(null)
            setIsFileUploaded(false)
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
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Your Order</h1>
                    <p className="text-gray-600">Fill in the details below and we'll get started on your order</p>
                </div>

                {/* Netlify Forms hidden input */}
                <input type="hidden" name="form-name" value="orders" />

                <form onSubmit={handleSubmit} data-netlify="true" className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                    {/* Selected Service Display */}
                    {formData.service && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
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
                            <option value="Custom Apparel">Custom Apparel</option>
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
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
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

                    {/* File Upload */}
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

                    {/* File Preview Section */}
                    {uploadedFile && (
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
