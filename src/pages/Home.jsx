import { Link } from 'react-router-dom'

const WHATSAPP_LINK = "https://wa.me/233500000000"

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section - Dark Mode Style with RaycoPrints Brand Colors */}
            <section className="relative min-h-screen flex items-center bg-rayco-forest overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFB800' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-rayco-gold/20 rounded-full blur-3xl opacity-50 animate-float"></div>
                <div className="absolute bottom-20 left-10 w-48 h-48 bg-rayco-orange/20 rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="text-center lg:text-left">
                            <div className="inline-block px-4 py-2 bg-rayco-gold/20 text-rayco-gold rounded-full text-sm font-semibold mb-6">
                                ✨ Premium Printing Services
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
                                Precision Printing.<br />
                                <span className="text-rayco-gold">Professional Results.</span>
                            </h1>
                            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                                Quality You Can Feel. From business cards to large format banners,
                                we bring your designs to life with exceptional craftsmanship.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-rayco-gold text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 hover:shadow-xl hover:shadow-rayco-gold/30 flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span>Order via WhatsApp</span>
                                </a>

                                <Link
                                    to="/contact"
                                    className="group border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Get Email Quote</span>
                                </Link>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-10 pt-8 border-t border-white/20">
                                <p className="text-white/60 text-sm mb-4">Trusted by 500+ local businesses</p>
                                <div className="flex items-center justify-center lg:justify-start space-x-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/20 border-2 border-rayco-forest flex items-center justify-center text-white font-bold text-sm">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="flex text-rayco-gold">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-white font-semibold">4.9/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image/Illustration */}
                        <div className="relative hidden lg:block">
                            <div className="relative w-full aspect-square">
                                {/* Main Card Mockup */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white rounded-2xl shadow-2xl rotate-6 animate-float flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-royal-400 to-royal-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-600 font-medium">Premium Business Cards</p>
                                    </div>
                                </div>

                                {/* Secondary Card Mockup */}
                                <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white rounded-2xl shadow-xl -rotate-3 animate-float flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-600 font-medium">Large Format Banners</p>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-royal-100 rounded-full blur-2xl opacity-60"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-200 rounded-full blur-2xl opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-24 bg-rayco-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-rayco-forest/10 text-rayco-forest rounded-full text-sm font-semibold mb-4">
                            Our Services
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Everything You Need to <span className="text-rayco-forest">Print Perfect</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: "📇", title: "Business Cards", desc: "Premium quality cards with matte, gloss, or soft-touch finishes." },
                            { icon: "�️", title: "Large Format Banners", desc: "Eye-catching vinyl banners for events and outdoor advertising." },
                            { icon: "👕", title: "Custom Apparel", desc: "High-quality printed T-shirts, hoodies, and uniforms." },
                        ].map((service, index) => (
                            <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                                <p className="text-slate-600">{service.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/services" className="inline-flex items-center space-x-2 text-rayco-forest font-semibold hover:text-rayco-gold">
                            <span>View All Services</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-rayco-gold/20 text-rayco-gold rounded-full text-sm font-semibold mb-4">
                            How It Works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Simple 3-Step <span className="text-rayco-gold">Ordering Process</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: "01", title: "Upload Your Design", desc: "Send us your artwork in PDF, AI, or high-res PNG format." },
                            { number: "02", title: "Choose Your Specs", desc: "Select paper weight, finish, quantity, and special requirements." },
                            { number: "03", title: "Send Us a Message", desc: "Contact us via WhatsApp or Email. We'll confirm within hours!" },
                        ].map((step, index) => (
                            <div key={index} className="relative">
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-rayco-gold to-yellow-400"></div>
                                )}
                                <div className="bg-rayco-sage/30 backdrop-blur-sm rounded-2xl p-8 border border-rayco-sage/50">
                                    <span className="text-6xl font-black text-rayco-gold/30">{step.number}</span>
                                    <h3 className="text-2xl font-bold text-white mt-4 mb-3">{step.title}</h3>
                                    <p className="text-slate-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-rayco-forest to-rayco-sage">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Print Your Project?</h2>
                    <p className="text-xl text-white/80 mb-8">Get a free quote today. Fast turnaround guaranteed.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/order"
                            className="bg-rayco-gold text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors"
                        >
                            Start Your Order
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
