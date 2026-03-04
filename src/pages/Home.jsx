import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import { useState, useEffect } from 'react'

const WHATSAPP_LINK = "https://wa.me/233246504887"

const heroImages = [
    "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop"
]

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const features = [
        {
            image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=400&h=300&fit=crop",
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Quality Guaranteed",
            description: "Premium materials and expert craftsmanship ensure lasting results."
        },
        {
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Fast Turnaround",
            description: "Quick delivery without compromising on quality."
        },
        {
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: "Expert Team",
            description: "Years of experience delivering exceptional print solutions."
        }
    ]

    const services = [
        { icon: "🖨️", title: "Printing", desc: "High-quality digital & offset printing", image: "https://i.pinimg.com/1200x/26/04/ca/2604cad5d3e50901a4b4f849bd0b1ae1.jpg" },
        { icon: "📇", title: "Business Cards", desc: "Premium cards that make an impact", image: "https://i.pinimg.com/736x/8d/36/46/8d36465fee3caa4147030012fd52c4d7.jpg" },
        { icon: "📜", title: "Banners", desc: "Large format for maximum visibility", image: "https://i.pinimg.com/736x/f6/c8/61/f6c861732047a947f1dbbdefa77186e3.jpg" },
        { icon: "👕", title: "Custom Apparel", desc: "Branded merchandise that stands out", image: "https://i.pinimg.com/736x/ec/87/e0/ec87e0ccccddf4d306069243d34c5a2f.jpg" }
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
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

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="text-center lg:text-left animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                                Premium Printing Services
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6">
                                Bring Your Ideas to{' '}
                                <span className="gradient-text-primary">Life</span>
                            </h1>

                            <p className="text-xl text-neutral-200 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Professional printing and design services that help your business stand out.
                                From business cards to large format banners, we deliver excellence.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/order"
                                    className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all duration-300 shadow-soft hover:shadow-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Start Your Order
                                </Link>

                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-green-400 hover:text-green-400 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-10 pt-8 border-t border-white/20">
                                <p className="text-neutral-300 text-sm mb-4">Trusted by 500+ local businesses</p>
                                <div className="flex items-center justify-center lg:justify-start gap-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white/30 flex items-center justify-center text-white font-semibold text-sm">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="flex text-accent-400">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-white font-semibold ml-1">4.9/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image/Illustration - Desktop */}
                        <div className="relative hidden lg:block animate-fade-in-up animation-delay-200">
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-soft-xl">
                                {/* Hero Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&h=600&fit=crop"
                                    alt="Professional printing services"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"></div>

                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-soft-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-heading font-semibold text-neutral-900">Quality Guaranteed</p>
                                                <p className="text-sm text-neutral-500">Premium materials & expert craftsmanship</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative floating element */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl animate-pulse-soft"></div>
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary-500/10 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Hero Carousel - Mobile */}
                        <div className="lg:hidden relative w-full aspect-[4/3] overflow-hidden rounded-3xl shadow-soft-xl mt-8">
                            {heroImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent"></div>
                                </div>
                            ))}
                            {/* Slide Navigation Dots */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                {heroImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? 'bg-white w-6'
                                            : 'bg-white/50 hover:bg-white/70'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative rounded-2xl overflow-hidden shadow-soft"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/30 to-transparent"></div>
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white mb-3">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-heading font-semibold text-white mb-1">{feature.title}</h3>
                                    <p className="text-neutral-200 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
                            Our Services
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-neutral-900 mb-4">
                            Everything You Need to{' '}
                            <span className="gradient-text-primary">Print Perfect</span>
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                            From business cards to large format banners, we offer a complete range of printing services to meet all your needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <Card
                                key={index}
                                hover
                                className="p-0 overflow-hidden"
                                padding="none"
                            >
                                {/* Image */}
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <div className="text-2xl mb-2">{service.icon}</div>
                                    <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-1">{service.title}</h3>
                                    <p className="text-neutral-600 text-sm">{service.desc}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                        >
                            <span>View All Services</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-neutral-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium mb-4">
                            How It Works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                            Simple 3-Step{' '}
                            <span className="gradient-text-accent">Process</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { number: "01", title: "Upload Your Design", desc: "Send us your artwork in PDF, AI, or high-res PNG format." },
                            { number: "02", title: "Choose Your Specs", desc: "Select paper weight, finish, quantity, and special requirements." },
                            { number: "03", title: "We Deliver", desc: "Contact us via WhatsApp or Email. We'll confirm and deliver!" },
                        ].map((step, index) => (
                            <div key={index} className="relative">
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent-500 to-accent-400"></div>
                                )}
                                <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50">
                                    <span className="text-6xl font-heading font-black text-accent-500/20">{step.number}</span>
                                    <h3 className="text-2xl font-heading font-bold text-white mt-4 mb-3">{step.title}</h3>
                                    <p className="text-neutral-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-heading font-bold text-white mb-4">Ready to Print Your Project?</h2>
                    <p className="text-xl text-white/80 mb-8">Get a free quote today. Fast turnaround guaranteed.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/order"
                            className="bg-white text-primary-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-neutral-50 transition-colors shadow-soft-lg"
                        >
                            Start Your Order
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
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
