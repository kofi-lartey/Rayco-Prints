import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input, Button, Select, Textarea } from '../components/ui'

export default function Order() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    // Pre-filled service from URL
    const prefillService = searchParams.get('service') || ''

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: prefillService,
        color: '',
        pages: '',
        quantity: '',
        totalPrice: '',
        file: '',
        message: ''
    })

    const [uploadedFile, setUploadedFile] = useState(null)
    const [uploadedFileUrl, setUploadedFileUrl] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    // Calculate price for photocopy services
    const calculatePrice = () => {
        if (formData.service === 'Photocopy' && formData.pages && formData.quantity) {
            const pricePerPage = formData.color === 'Black & White' ? 0.10 : 0.30
            const total = Math.ceil(formData.pages) * Math.ceil(formData.quantity) * pricePerPage
            return total.toFixed(2)
        }
        return ''
    }

    useEffect(() => {
        const price = calculatePrice()
        if (price) {
            setFormData(prev => ({ ...prev, totalPrice: price }))
        }
    }, [formData.pages, formData.quantity, formData.color, formData.service])

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
                'image/png', 'image/jpeg', 'image/jpg']

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
            uploadFile(file)
        }
    }

    // Upload file to Cloudinary
    const uploadFile = async (file) => {
        setUploadProgress(0)

        const cloudName = 'dxkbm9qqt' // Replace with your Cloudinary cloud name
        const uploadPreset = 'raycoprints' // Replace with your upload preset

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            )

            const data = await response.json()

            if (data.secure_url) {
                setUploadedFileUrl(data.secure_url)
                setUploadProgress(100)
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

        // For Netlify Forms - add form data as hidden fields
        const form = e.target
        const formData = new FormData(form)

        // Add the uploaded file URL if available
        if (uploadedFileUrl) {
            formData.append('file_url', uploadedFileUrl)
        }

        try {
            // Submit to Netlify Forms
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            })

            if (response.ok) {
                setSubmitStatus('success')
                // Navigate to success page
                navigate('/success')
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
            } else {
                throw new Error('Failed to submit form')
            }
        } catch (error) {
            console.error('Form Submission Error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Show NB note for Photocopy service
    const showNB = formData.service === 'Photocopy'

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

                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
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
                            <option value="Photocopy">Photocopy</option>
                            <option value="Printing">Printing</option>
                            <option value="Binding">Binding</option>
                            <option value="Lamination">Lamination</option>
                            <option value="Scanning">Scanning</option>
                            <option value="Design">Graphic Design</option>
                        </Select>
                    </div>

                    {/* NB Note for Photocopy */}
                    {showNB && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <strong>NB:</strong> For photocopy orders, please visit our shop
                                        with your documents. We're located at Pokuasi near the junction.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Color Selection (for Photocopy and Printing) */}
                    {(formData.service === 'Photocopy' || formData.service === 'Printing') && (
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
                                <option value="Black & White">Black & White</option>
                                <option value="Colored">Colored</option>
                            </Select>
                        </div>
                    )}

                    {/* Pages (for Photocopy) */}
                    {formData.service === 'Photocopy' && (
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
                                required
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
                                    <div className="text-sm text-green-600">
                                        <p className="font-medium">File uploaded successfully!</p>
                                        <p className="text-gray-500">{uploadedFile.name}</p>
                                        {uploadProgress < 100 && (
                                            <p className="text-blue-600">Uploading... {uploadProgress}%</p>
                                        )}
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
                                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
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

                    {/* Total Price Display */}
                    {formData.totalPrice && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-green-800 font-medium">Estimated Total:</span>
                                <span className="text-2xl font-bold text-green-600">GHC {formData.totalPrice}</span>
                            </div>
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
