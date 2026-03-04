import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import { useState, useEffect } from 'react'

const WHATSAPP_LINK = "https://wa.me/233246504887"

const heroImages = [
    "https://i.pinimg.com/736x/50/de/19/50de19add962cda96db262bd785343d7.jpg",
    "https://i.pinimg.com/736x/f6/c8/61/f6c861732047a947f1dbbdefa77186e3.jpg",
    "https://i.pinimg.com/736x/ec/87/e0/ec87e0ccccddf4d306069243d34c5a2f.jpg",
    "https://i.pinimg.com/736x/be/0f/bc/be0fbcf8198660bd407e6b6f29b5e92b.jpg"
]

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const counterRef = useState({ current: null })

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.5 }
        )

        const element = document.getElementById('stats-section')
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * end))

            if (progress < 1) {
                requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }, [isVisible, end, duration])

    return <span>{count}{suffix}</span>
}

const Portfolio = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const portfolioItems = [
        {
            category: "Business Cards",
            color: "from-primary-500 to-primary-700",
            projects: 120,
            icon: "📇",
            image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop"
        },
        {
            category: "Banners",
            color: "from-neutral-600 to-neutral-800",
            projects: 85,
            icon: "🚩",
            image: "https://i.pinimg.com/736x/f6/c8/61/f6c861732047a947f1dbbdefa77186e3.jpg"
        },
        {
            category: "Custom Apparel",
            color: "from-accent-500 to-accent-600",
            projects: 200,
            icon: "👕",
            image: "https://i.pinimg.com/736x/ec/87/e0/ec87e0ccccddf4d306069243d34c5a2f.jpg"
        },
        {
            category: "Stationery",
            color: "from-teal-500 to-cyan-600",
            projects: 95,
            icon: "📝",
            image: "https://i.pinimg.com/736x/be/0f/bc/be0fbcf8198660bd407e6b6f29b5e92b.jpg"
        },
        {
            category: "Brochures",
            color: "from-rose-500 to-pink-600",
            projects: 150,
            icon: "📄",
            image: "https://i.pinimg.com/736x/20/fd/f2/20fdf294e2305e38cc14487485bb73e0.jpg"
        },
        {
            category: "Passport Pictures",
            color: "from-violet-500 to-purple-600",
            projects: 75,
            icon: "📸",
            image: "https://i.pinimg.com/736x/50/de/19/50de19add962cda96db262bd785343d7.jpg"
        },
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
            <section className="py-16 relative overflow-hidden">
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                        Our Work
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                        Featured <span className="gradient-text-primary">Projects</span>
                    </h1>
                    <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
                        A glimpse of what we've created for our satisfied clients across various industries.
                    </p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioItems.map((item, index) => (
                            <div
                                key={index}
                                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.category}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                    <span className="text-white font-heading font-semibold text-lg">{item.category}</span>
                                    <p className="text-white/70 text-sm">{item.projects} projects completed</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats-section" className="py-16 bg-neutral-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-primary-400 mb-2"><AnimatedCounter end={500} suffix="+" /></div>
                            <div className="text-neutral-400">Happy Clients</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-primary-400 mb-2"><AnimatedCounter end={5} suffix="+" /></div>
                            <div className="text-neutral-400">Years Experience</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-primary-400 mb-2"><AnimatedCounter end={5000} suffix="+" /></div>
                            <div className="text-neutral-400">Orders Completed</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-primary-400 mb-2"><AnimatedCounter end={98} suffix="%" /></div>
                            <div className="text-neutral-400">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
                            Testimonials
                        </span>
                        <h2 className="text-4xl font-heading font-bold text-neutral-900">What Our Clients Say</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="p-8 animate-fade-in-up" hover style={{ animationDelay: `${index * 150}ms` }}>
                                <div className="flex text-accent-500 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-neutral-600 mb-6 italic">"{testimonial.quote}"</p>
                                <div>
                                    <div className="font-heading font-semibold text-neutral-900">{testimonial.name}</div>
                                    <div className="text-neutral-500 text-sm">{testimonial.company}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted By */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h3 className="text-xl font-heading font-semibold text-neutral-600">Trusted by leading businesses</h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                        {['TechStart Ghana', 'FashionHub', 'Cafe Royale', 'AutoMax', 'HealthPlus', 'EduCore'].map((brand, i) => (
                            <div key={i} className="text-neutral-400 font-heading font-bold text-xl hover:text-primary-500 transition-colors cursor-pointer">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to Work With Us?</h2>
                    <p className="text-white/80 mb-8">Let's create something amazing for your brand.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/order"
                            className="bg-white text-primary-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-neutral-50 transition-colors"
                        >
                            Start Your Project
                        </Link>
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
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
