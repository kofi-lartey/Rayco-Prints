import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const WHATSAPP_LINK = "https://wa.me/233500000000"

const Services = () => {
  const [selectedService, setSelectedService] = useState(null)
  const navigate = useNavigate()

  const services = [
    {
      id: 'photocopy',
      title: 'Photocopy Services',
      description: 'High-quality black & white and colour photocopying services',
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=300&fit=crop',
      icon: '📄',
      note: 'Visit the shop with your documents for photocopying. If sending digitally, documents will be printed first before photocopying (additional printing fees may apply). Check Printing Services for rates.',
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
      icon: '🖨️',
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
      icon: '📸',
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
      icon: '✍️',
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
      image: 'https://images.unsplash.com/photo-1553222843-3d3c5d4d1b1b?w=400&h=300&fit=crop',
      icon: '🪪',
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
      icon: '🃏',
      pricing: [
        { item: 'ID Card/A5', price: 'GHC 5.00' },
        { item: 'A4', price: 'GHC 5.00' },
        { item: 'A3', price: 'GHC 10.00' },
      ]
    },
    {
      id: 'envelope',
      title: 'Envelope Printing',
      description: 'Custom printed envelopes for your business correspondence',
      image: 'https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=400&h=300&fit=crop',
      icon: '✉️',
      pricing: [
        { item: 'DL Envelope - B&W', price: 'GHC 1.50' },
        { item: 'DL Envelope - Colour', price: 'GHC 2.00' },
        { item: 'A5 Envelope', price: 'GHC 2.50' },
        { item: 'A4 Envelope', price: 'GHC 3.50' },
      ]
    },
    {
      id: 'dtf',
      title: 'DTF Printing',
      description: 'Direct to Film printing for vibrant custom designs',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      icon: '🎨',
      pricing: [
        { item: 'DTF Printing - A4', price: 'GHC 7.00' },
        { item: 'DTF Printing - A3', price: 'GHC 14.00' },
      ]
    },
    {
      id: 'apparel',
      title: 'Custom Apparel',
      description: 'Custom printed T-shirts and jersey customization',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      icon: '👕',
      pricing: [
        { item: 'T-Shirt - Jersey', price: 'GHC 45.00' },
        { item: 'T-Shirt - Cotton', price: 'GHC 55.00' },
        { item: 'T-Shirt - Lacoste', price: 'GHC 70.00' },
        { item: 'Jersey Name Only', price: 'GHC 15.00' },
        { item: 'Jersey Name & Number', price: 'GHC 35.00' },
      ]
    },
    {
      id: 'frames',
      title: 'Picture Frames',
      description: 'Beautiful frames for your photos and certificates',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=300&fit=crop',
      icon: '🖼️',
      pricing: [
        { item: 'A4 Frame (F.O)', price: 'GHC 70.00' },
        { item: 'A3 Frame (F.O)', price: 'GHC 120.00' },
        { item: 'A4 Frame', price: 'GHC 90.00' },
        { item: 'A3 Frame', price: 'GHC 150.00' },
      ]
    },
    {
      id: 'design',
      title: 'Graphic Design',
      description: 'Professional design services for all your needs',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      icon: '🎯',
      pricing: [
        { item: 'Obituary Design', price: 'Contact for quote' },
        { item: 'Letterhead Design', price: 'Contact for quote' },
        { item: 'Envelope Design', price: 'Contact for quote' },
        { item: 'Invitation Design', price: 'Contact for quote' },
        { item: 'Banner/Sticker Design', price: 'Contact for quote' },
      ]
    },
    {
      id: 'generator',
      title: 'Generator Rates',
      description: 'Services available during power outages',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop',
      icon: '⚡',
      note: 'Slightly higher to cover fuel costs',
      pricing: [
        { item: 'A4 Photocopy - B&W', price: 'GHC 0.50 - 1.00' },
        { item: 'A4 Photocopy - Colour', price: 'GHC 3.00 - 4.00' },
        { item: 'A3 Photocopy - B&W', price: 'GHC 2.50 - 3.50' },
        { item: 'A3 Photocopy - Colour', price: 'GHC 4.00 - 6.00' },
        { item: 'A4 Typing & Print', price: 'GHC 8.00' },
      ]
    }
  ]

  const handleOrderClick = (service, item = null) => {
    // Navigate to order page with pre-filled details
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
    window.open(`https://wa.me/233500000000?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-rayco-forest via-rayco-sage to-rayco-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Our <span className="text-rayco-gold">Services</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Professional printing and secretarial services at competitive prices.
              Click on any service to get a quote instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${selectedService === service.id ? 'ring-4 ring-rayco-forest' : ''}`}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-4xl bg-white/90 backdrop-blur-sm rounded-xl p-2">{service.icon}</span>
                  </div>
                  {service.note && service.id !== 'photocopy' && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {service.note}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-600 mb-4">{service.description}</p>

                  {/* NB Note for Photocopy Services - Show right after description */}
                  {service.id === 'photocopy' && (
                    <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-600 text-sm">⚠️</span>
                        <p className="text-xs text-yellow-800">{service.note}</p>
                      </div>
                    </div>
                  )}

                  {/* Expandable Pricing */}
                  <div className={`overflow-hidden transition-all duration-500 ${selectedService === service.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="border-t border-slate-200 pt-4 mt-4">
                      <h4 className="font-bold text-slate-900 mb-3">Select an Option</h4>
                      <div className="space-y-2">
                        {service.pricing.map((price, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-slate-100 cursor-pointer group transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOrderClick(service, price)
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-rayco-forest rounded-full group-hover:scale-150 transition-transform"></span>
                              <span className="text-slate-600 group-hover:text-slate-900">{price.item}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-rayco-forest">{price.price}</span>
                              <span className="text-xs bg-rayco-forest text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                Order →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOrderClick(service)
                      }}
                      className="flex-1 bg-rayco-forest text-white py-2.5 rounded-lg font-semibold hover:bg-rayco-sage transition-colors text-sm"
                    >
                      Order via Email
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWhatsAppClick(service)
                      }}
                      className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </button>
                  </div>

                  <p className="text-center text-slate-400 text-xs mt-3">
                    {selectedService === service.id ? 'Click to collapse' : 'Click to view pricing'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-slate-600 mb-8">Contact us for custom orders or special requirements. We're here to help!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-rayco-forest text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rayco-sage transition-colors"
            >
              Contact Us
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 border-2 border-green-500 text-green-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-500 hover:text-white transition-colors"
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
