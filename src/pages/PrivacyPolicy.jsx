import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

                    <p className="text-gray-600 mb-8">
                        <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
                            <p>
                                At Rayco Graphics, we value your privacy and are committed to protecting your personal information.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                                when you visit our website or use our printing services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    <strong>Personal Information:</strong> Name, email address, phone number, physical address
                                    when you place an order or contact us
                                </li>
                                <li>
                                    <strong>Order Information:</strong> Details about the products you order, including custom
                                    designs, specifications, and delivery preferences
                                </li>
                                <li>
                                    <strong>Payment Information:</strong> Billing address and payment method details (processed
                                    securely through our payment partners)
                                </li>
                                <li>
                                    <strong>Usage Data:</strong> Information about how you interact with our website, including
                                    pages visited and time spent
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
                            <p className="mb-2">We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Process and fulfill your printing orders</li>
                                <li>Communicate with you about your orders, inquiries, and customer support</li>
                                <li>Send you promotional materials, newsletters, and updates (with your consent)</li>
                                <li>Improve our services, website, and customer experience</li>
                                <li>Comply with legal obligations and prevent fraud</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Information Sharing & Disclosure</h2>
                            <p className="mb-2">We may share your information with:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Service Providers:</strong> Third-party vendors who assist in order fulfillment,
                                    payment processing, and delivery</li>
                                <li><strong>Business Partners:</strong> When you request products or services from our
                                    trusted partners</li>
                                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental
                                    regulation</li>
                            </ul>
                            <p className="mt-3">
                                We do not sell, trade, or otherwise transfer your personal information to outside parties
                                without your consent, except as described above.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal
                                information against unauthorized access, alteration, disclosure, or destruction. These
                                measures include SSL encryption for data transmission, secure server storage, and regular
                                security assessments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Data Retention</h2>
                            <p>
                                We retain your personal information for as long as necessary to fulfill the purposes
                                outlined in this Privacy Policy, unless a longer retention period is required or
                                permitted by law. Order history may be retained for accounting and warranty purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access and obtain a copy of your personal information</li>
                                <li>Request correction of inaccurate personal information</li>
                                <li>Request deletion of your personal information (subject to legal requirements)</li>
                                <li>Opt-out of marketing communications at any time</li>
                                <li>Request restriction of processing your personal information</li>
                            </ul>
                            <p className="mt-3">
                                To exercise these rights, please contact us using the information provided below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Cookies & Tracking Technologies</h2>
                            <p>
                                Our website uses cookies and similar tracking technologies to enhance your browsing
                                experience. You can instruct your browser to refuse all cookies or to indicate when
                                a cookie is being sent. However, some features of our website may not function properly
                                without cookies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">9. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites, services, or applications.
                                We are not responsible for the privacy practices or the content of these third parties.
                                We encourage you to review the privacy policies of those third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">10. Children's Privacy</h2>
                            <p>
                                Our services are not intended for individuals under the age of 13. We do not knowingly
                                collect personal information from children. If you become aware that a child has
                                provided us with personal information, please contact us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">11. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes
                                by posting the new Privacy Policy on this page and updating the "Effective Date" at
                                the top. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">12. Contact Us</h2>
                            <p>
                                If you have any questions or concerns about this Privacy Policy, please contact us:
                            </p>
                            <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                                <p><strong>Rayco Graphics</strong></p>
                                <p>Prampram - V-PUB, Ghana</p>
                                <p>Email: raycographics@gmail.com</p>
                                <p>Phone: +233 24 650 4887</p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            to="/"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
