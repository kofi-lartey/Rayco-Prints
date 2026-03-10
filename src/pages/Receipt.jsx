import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '../components/ui'

export default function Receipt() {
    const { orderId } = useParams()
    const [orderData, setOrderData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const data = params.get('data')

        if (data) {
            try {
                const decoded = JSON.parse(atob(data))
                setOrderData(decoded)
            } catch (e) {
                console.error('Failed to parse order data:', e)
            }
        }
        setLoading(false)
    }, [orderId])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading receipt...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-black px-8 py-6 text-center">
                        <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Rayco Prints</h1>
                        <p className="text-yellow-400 text-xs mt-1 tracking-widest font-bold">Premium Printing Services</p>
                    </div>

                    <div className="px-8 py-6">
                        <div className="text-center mb-8">
                            <p className="text-sm text-gray-500 uppercase font-bold">Order ID</p>
                            <p className="text-2xl font-bold text-gray-900">{orderId || 'N/A'}</p>
                        </div>

                        {orderData ? (
                            <>
                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h2 className="text-sm text-gray-500 uppercase font-bold mb-3">Client Details</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Name</p>
                                            <p className="font-semibold">{orderData.from_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="font-semibold">{orderData.phone}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="font-semibold">{orderData.from_email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h2 className="text-sm text-gray-500 uppercase font-bold mb-3">Order Details</h2>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Service</span>
                                            <span className="font-semibold">{orderData.service}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Item</span>
                                            <span className="font-semibold">{orderData.item}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Side</span>
                                            <span className="font-semibold">{orderData.side}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Color</span>
                                            <span className="font-semibold">{orderData.color}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Pages</span>
                                            <span className="font-semibold">{orderData.pages}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Quantity</span>
                                            <span className="font-semibold">{orderData.quantity}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                        <span className="text-2xl font-bold text-green-600">GHC {orderData.total_price}</span>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                    <h3 className="font-bold text-blue-900 mb-2">Payment Information</h3>
                                    <p className="text-sm text-blue-800">
                                        <strong>MoMo Number:</strong> 0246503887 (Rayco Graphics)
                                    </p>
                                    <p className="text-xs text-blue-600 mt-2">
                                        Pay to this number and bring your receipt when picking up.
                                    </p>
                                </div>

                                {orderData.file_url && (
                                    <div className="mb-6">
                                        <h3 className="font-bold text-gray-900 mb-2">Attached File</h3>
                                        <a
                                            href={orderData.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            View Print File ({orderData.file_format})
                                        </a>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600 mb-4">
                                    Order details not available.
                                </p>
                                <Link to="/order">
                                    <Button>Place New Order</Button>
                                </Link>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-500">
                                Thank you for choosing Rayco Prints!
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Prampram-New V-Pub, Ghana
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center space-x-4">
                    <Link to="/" className="text-blue-600 hover:underline">
                        Back to Home
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link to="/order" className="text-blue-600 hover:underline">
                        New Order
                    </Link>
                </div>
            </div>
        </div>
    )
}
