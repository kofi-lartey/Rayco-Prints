import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/ui'

const WHATSAPP_LINK = "https://wa.me/233246504887"

const heroImages = [
  "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=800&fit=crop"
]

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const services = [
    {
      id: 'photocopy',
      title: 'Photocopy Services',
      description: 'High-quality black & white and colour photocopying services',
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      note: 'Visit the shop with your documents for photocopying. If sending digitally, documents will be printed first before photocopying (additional printing fees may apply).',
      pricing: [
        { item: 'A4 Photocopy - B&W Front', price: 'GHC 0.50' },
        { item: 'A4 Photocopy - B&W (F&B)', price: 'GHC 0.80' },
        { item: 'A4 Photocopy - Colour Front', price: 'GHC 2.00' },
        { item: 'A4 Photocopy - Colour (F&B)', price: 'GHC 3.00' },
        { item: 'A3 Photocopy - B&W Front', price: 'GHC 1.50' },
        { item: 'A3 Photocopy - Colour Front', price: 'GHC 3.00' },
      ]
    },
    {
      id: 'printing',
      title: 'Printing Services',
      description: 'Professional printing on standard paper and hard card',
      image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=400&h=300&fit=crop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      ),
      pricing: [
        { item: 'A4 Printing - B&W', price: 'GHC 1.50' },
        { item: 'A4 Printing - Colour', price: 'GHC 3.00' },
        { item: 'A3 Printing - B&W', price: 'GHC 3.00' },
        { item: 'A3 Printing - Colour', price: 'GHC 4.00' },
        { item: 'Hard Card/Certificate', price: 'GHC 5.00 - 10.00' },
      ]
    },
    {
      id: 'photo',
      title: 'Photo Printing',
      description: 'Premium photo prints on high-quality photo paper',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      pricing: [
        { item: 'Photo Paper A4', price: 'GHC 20.00' },
        { item: 'Photo Paper A3', price: 'GHC 30.00' },
        { item: '5x7 Photo', price: 'GHC 15.00' },
        { item: '6x4 Photo', price: 'GHC 10.00' },
      ]
    },
    {
      id: 'secretarial',
      title: 'Secretarial Services',
      description: 'Professional typing, CV writing, and online applications',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      pricing: [
        { item: 'Typing & Printing (A4)', price: 'GHC 5.00' },
        { item: 'Typing Only (A4)', price: 'GHC 4.00' },
        { item: 'Application Letter', price: 'GHC 7.00' },
        { item: 'Curriculum Vitae (CV)', price: 'GHC 10.00' },
        { item: 'Online Application', price: 'GHC 30.00' },
        { item: 'Scanning', price: 'GHC 2.00' },
      ]
    },
    {
      id: 'passport',
      title: 'Passport Pictures',
      description: 'Official passport photos for all visa applications',
      image: 'https://i.pinimg.com/736x/50/de/19/50de19add962cda96db262bd785343d7.jpg',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      pricing: [
        { item: 'Passport (4 copies)', price: 'GHC 15.00' },
        { item: 'Passport (6 copies)', price: 'GHC 20.00' },
        { item: 'Passport (8 copies)', price: 'GHC 25.00' },
        { item: 'American Size (4 copies)', price: 'GHC 30.00' },
      ]
    },
    {
      id: 'laminating',
      title: 'Laminating',
      description: 'Protect your documents with professional laminating',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      pricing: [
        { item: 'ID Card/A5', price: 'GHC 5.00' },
        { item: 'A4', price: 'GHC 5.00' },
        { item: 'A3', price: 'GHC 10.00' },
      ]
    },
    {
      id: 'apparel',
      title: 'Custom Apparel',
      description: 'Custom printed T-shirts and jersey customization',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      pricing: [
        { item: 'T-Shirt - Jersey (Dozen)', price: 'GHC 19.00' },
        { item: 'T-Shirt - Jersey (Single)', price: 'GHC 23.00' },
        { item: 'T-Shirt - Vicyao Cotton (Dozen)', price: 'GHC 27.00' },
        { item: 'T-Shirt - Vicyao Cotton (Single)', price: 'GHC 30.00' },
        { item: 'T-Shirt - Mr Tan Lacoste (Dozen)', price: 'GHC 33.00' },
        { item: 'T-Shirt - Mr Tan Lacoste (Single)', price: 'GHC 33.00' },
        { item: 'Jersey Name Only', price: 'GHC 15.00' },
        { item: 'Jersey Name & Number', price: 'GHC 35.00' },
      ]
    },
    {
      id: 'frames',
      title: 'Picture Frames',
      description: 'Beautiful frames for your photos and certificates',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=300&fit=crop',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      pricing: [
        { item: 'A4 Frame (F.O)', price: 'GHC 70.00' },
        { item: 'A3 Frame (F.O)', price: 'GHC 120.00' },
        { item: 'A4 Frame', price: 'GHC 90.00' },
        { item: 'A3 Frame', price: 'GHC 150.00' },
      ]
    },
  ]

  const handleOrderClick = (service, item = null) => {
    const params = new URLSearchParams()
    params.set('service', service.title)
    if (item) {
      params.set('item', item.item)
      params.set('price', item.price)
    }
    navigate(`/order?${params.toString()}`)
  }

  const handleWhatsAppClick = (service) => {
    const message = `Hi Rayco Graphix, I'm interested in ${service.title}. Can you give me a quote?`
    window.open(`https://wa.me/233246504887?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
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
              <div className="absolute inset-0 bg-primary-900/80"></div>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Our <span className="text-accent-400">Services</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Professional printing and secretarial services at competitive prices.
              Click on any service to get a quote instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className={`group overflow-hidden cursor-pointer transition-all duration-500 animate-fade-in-up ${selectedService === service.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
                padding="none"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent z-10"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-primary-500">
                      {service.icon}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 z-20 right-3">
                    <h3 className="text-lg font-heading font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-neutral-600 text-sm mb-4">{service.description}</p>

                  {/* Expandable Pricing */}
                  <div className={`overflow-hidden transition-all duration-500 ${selectedService === service.id ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="border-t border-neutral-200 pt-4 mt-4">
                      <h4 className="font-heading font-semibold text-neutral-900 mb-3 text-sm">Pricing</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {service.pricing.map((price, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-xs p-2 rounded-lg hover:bg-primary-50 cursor-pointer group transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOrderClick(service, price)
                            }}
                          >
                            <span className="text-neutral-600">{price.item}</span>
                            <span className="font-bold text-primary-600">{price.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrderClick(service)
                      }}
                      className="flex-1 bg-primary-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-primary-600 transition-colors"
                    >
                      Order
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWhatsAppClick(service)
                      }}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-neutral-600 mb-8">Contact us for custom orders or special requirements. We're here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-green-500 text-green-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
