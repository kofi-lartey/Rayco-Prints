import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScroll } from '../../hooks'
import { CONFIG } from '../../config'
import { cn } from '../../utils'
import Button from '../ui/Button'

/**
 * Navbar Component
 * Modern, elegant navigation with glass effect and smooth transitions
 */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const isScrolled = useScroll(50)
    const location = useLocation()

    const { navItems, contact } = CONFIG

    const isActive = (path) => location.pathname === path

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                isScrolled
                    ? 'bg-white/95 backdrop-blur-lg shadow-soft-lg'
                    : 'bg-neutral-900/80 backdrop-blur-md'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src="https://res.cloudinary.com/djjgkezui/image/upload/v1772650253/logo_krbgmz.png"
                                alt="RaycoGraphix Logo"
                                className="h-12 w-auto rounded-lg"
                            />
                            <div className="hidden sm:block">
                                <span className={cn(
                                    "font-heading font-bold text-xl",
                                    isScrolled ? "text-neutral-900" : "text-white"
                                )}>
                                    Rayco<span className="text-primary-400">Graphix</span>
                                </span>
                                <p className={cn(
                                    "text-xs -mt-1",
                                    isScrolled ? "text-neutral-500" : "text-neutral-300"
                                )}>Print & Design</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm',
                                    isActive(item.path)
                                        ? 'text-primary-400 bg-primary-500/20'
                                        : isScrolled
                                            ? 'text-neutral-700 hover:text-primary-500 hover:bg-primary-50/50'
                                            : 'text-white hover:text-primary-400 hover:bg-white/10'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            to={navItems.find(n => n.name === 'Order Now')?.path || '/order'}
                            className="bg-primary-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-all duration-300 shadow-soft hover:shadow-medium flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Order Now
                        </Link>
                        <a
                            href={contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white hover:bg-green-600 transition-all duration-300 shadow-soft hover:shadow-medium"
                            aria-label="Chat on WhatsApp"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
                                isScrolled
                                    ? "text-neutral-700 hover:text-primary-500 hover:bg-primary-50"
                                    : "text-white hover:text-primary-400 hover:bg-white/10"
                            )}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden pb-6 animate-fade-in-down">
                        <div className="bg-white rounded-2xl shadow-soft-lg p-4 border border-neutral-100">
                            <div className="flex flex-col space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            'px-4 py-3 rounded-xl font-medium transition-all duration-200',
                                            isActive(item.path)
                                                ? 'text-primary-500 bg-primary-50'
                                                : 'text-neutral-600 hover:text-primary-500 hover:bg-primary-50/50'
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-3 mt-3 border-t border-neutral-100 flex flex-col gap-2">
                                    <a
                                        href={contact.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-green-500 text-white px-4 py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
