import { Link } from 'react-router-dom'

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Terms of Service</h1>

                    <p className="text-gray-600 mb-8">
                        <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using the Rayco Graphics website and services, you accept and agree to be
                                bound by the terms and provision of this agreement. If you do not agree to abide by
                                these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Description of Service</h2>
                            <p>
                                Rayco Graphics provides professional printing services including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Business cards, letterheads, and corporate stationery</li>
                                <li>Marketing materials (brochures, flyers, banners)</li>
                                <li>Custom apparel printing</li>
                                <li>Large format printing</li>
                                <li>Binding and finishing services</li>
                                <li>Graphic design services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. User Account Responsibilities</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You must provide accurate and complete registration information</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You agree to accept responsibility for all activities that occur under your account</li>
                                <li>You must notify us immediately of any unauthorized use of your account</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Orders and Payment</h2>

                            <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Order Placement</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>All orders are subject to availability and confirmation</li>
                                <li>You must provide accurate design files in the specified formats</li>
                                <li>Custom orders may require approval of proofs before production</li>
                                <li>We reserve the right to refuse or cancel any order for any reason</li>
                            </ul>

                            <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Pricing and Payment</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>All prices are subject to change without notice</li>
                                <li>Payment is required at the time of order unless otherwise agreed</li>
                                <li>We accept various payment methods as indicated on our website</li>
                                <li>Prices do not include applicable taxes unless stated otherwise</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Intellectual Property Rights</h2>

                            <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Your Content</h3>
                            <p>
                                You retain ownership of all designs, artwork, and materials you submit for printing
                                ("Your Content"). By submitting Your Content, you grant us a limited license to use
                                it solely for fulfilling your order.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Our Content</h3>
                            <p>
                                All content on our website, including logos, graphics, text, and software, is the
                                property of Rayco Graphics and is protected by copyright and other intellectual property laws.
                            </p>

                            <h3 className="text-xl font-medium text-gray-800 mt-4 mb-2">Copyright Infringement</h3>
                            <p>
                                You represent and warrant that you have the right to use any materials you submit for
                                printing. We do not knowingly print copyrighted materials without proper authorization.
                                You agree to indemnify us against any claims arising from infringement of third-party rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Production and Delivery</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Production times are estimates and not guaranteed</li>
                                <li>We will make reasonable efforts to meet stated turnaround times</li>
                                <li>Delivery times vary based on location and shipping method selected</li>
                                <li>Risk of loss passes to you upon delivery to the carrier</li>
                                <li>You are responsible for inspecting deliveries and reporting damages</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Returns and Refunds</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Due to the custom nature of printing, we generally do not accept returns</li>
                                <li>If you receive defective products, you must report within 48 hours of delivery</li>
                                <li>Defective products will be reprinted or refunded at our discretion</li>
                                <li>Refunds, when approved, are processed within 14 business days</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Limitation of Liability</h2>
                            <p>
                                RAYCOPRINTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                                OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES. OUR TOTAL
                                LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT PAID FOR THE SPECIFIC ORDER GIVING
                                RISE TO THE CLAIM.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">9. Disclaimers</h2>
                            <p>
                                OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WE
                                DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. WE RESERVE THE
                                RIGHT TO MODIFY OR DISCONTINUE OUR SERVICES AT ANY TIME WITHOUT NOTICE.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">10. Indemnification</h2>
                            <p>
                                You agree to indemnify, defend, and hold harmless Rayco Graphics and its officers, directors,
                                employees, and agents from any claims, damages, losses, liabilities, costs, or expenses
                                arising out of your use of our services or violation of these Terms of Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">11. Governing Law</h2>
                            <p>
                                These Terms of Service shall be governed by and construed in accordance with the laws of
                                Ghana, without regard to its conflict of law provisions. Any disputes arising under these
                                terms shall be subject to the exclusive jurisdiction of the courts of Ghana.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">12. Modifications to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms of Service at any time. Any changes will be
                                posted on this page with an updated effective date. Your continued use of our services
                                after such changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">13. Termination</h2>
                            <p>
                                We may terminate or suspend your access to our services immediately, without prior notice
                                or liability, for any reason, including breach of these Terms of Service. Upon termination,
                                your right to use our services will immediately cease.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">14. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                                <p><strong>Rayco Graphics</strong></p>
                                <p>Prampram - V-PUB, Ghana</p>
                                <p>Email: raycographics@gmail.com</p>
                                <p>Phone: +233 53 042 2097</p>
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

export default TermsOfService
