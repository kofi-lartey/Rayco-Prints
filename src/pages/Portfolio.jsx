import { Link } from 'react-router-dom'

const WHATSAPP_LINK = "https://wa.me/233500000000"

const Portfolio = () => {
    const portfolioItems = [
        { category: "Business Cards", color: "from-royal-500 to-royal-700", projects: 120 },
        { category: "Banners", color: "from-slate-600 to-slate-800", projects: 85 },
        { category: "Apparel", color: "from-amber-500 to-orange-600", projects: 200 },
        { category: "Stationery", color: "from-teal-500 to-cyan-600", projects: 95 },
        { category: "Brochures", color: "from-rose-500 to-pink-600", projects: 150 },
        { category: "Packaging", color: "from-violet-500 to-purple-600", projects: 75 },
    ]

    const testimonials = [
        {
            name: "Sarah Mensah",
            company: "TechStart Ghana",
            quote: "RaycoPrints delivered our business cards exactly as we imagined. Professional quality and fast turnaround!",
            rating: 5
        },
        {
            name: "David Kofi",
            company: "FashionHub",
            quote: "Excellent print quality on our promotional banners. Highly recommended!",
            rating: 5
        },
        {
            name: "Emma Owusu",
            company: "Cafe Royale",
            quote: "Our team uniforms look amazing. Great attention to detail.",
            rating: 5
        }
    ]

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-royal-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-2 bg-rayco-forest/10 text-rayco-forest rounded-full text-sm font-semibold mb-4">
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        A glimpse of what we've created for our satisfied clients across various industries.
                    </p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioItems.map((item, index) => (
                            <div
                                key={index}
                                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-500`}></div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <span className="text-white font-medium">{item.category}</span>
                                    <p className="text-white/70 text-sm">{item.projects} projects completed</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-royal-400 mb-2">500+</div>
                            <div className="text-slate-400">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-royal-400 mb-2">5+</div>
                            <div className="text-slate-400">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-royal-400 mb-2">10K+</div>
                            <div className="text-slate-400">Orders Completed</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-royal-400 mb-2">98%</div>
                            <div className="text-slate-400">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-rayco-forest/10 text-rayco-forest rounded-full text-sm font-semibold mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-4xl font-bold text-slate-900">What Our Clients Say</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-600 mb-6 italic">"{testimonial.quote}"</p>
                                <div>
                                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                                    <div className="text-slate-500 text-sm">{testimonial.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted By */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h3 className="text-xl font-semibold text-slate-600">Trusted by leading businesses</h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                        {['TechStart Ghana', 'FashionHub', 'Cafe Royale', 'AutoMax', 'HealthPlus', 'EduCore'].map((brand, i) => (
                            <div key={i} className="text-slate-400 font-bold text-xl hover:text-royal-500 transition-colors cursor-pointer">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-royal-500 to-royal-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
                    <p className="text-white/80 mb-8">Let's create something amazing for your brand.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/order"
                            className="bg-rayco-gold text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors"
                        >
                            Start Your Project
                        </Link>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Portfolio
