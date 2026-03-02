import { Link, useLocation } from 'react-router-dom'
import { useMobileMenu, useScroll } from '../../hooks'
import { CONFIG } from '../../config'
import { cn } from '../../utils'

/**
 * Navbar Component
 * Responsive navigation with mobile menu
 */
const Navbar = () => {
    const { isOpen, toggleMenu, closeMenu } = useMobileMenu()
    const isScrolled = useScroll(50)
    const location = useLocation()

    const { navItems, contact } = CONFIG

    const isActive = (path) => location.pathname === path

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-rayco-forest shadow-lg'
                    : 'bg-rayco-forest'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-12 h-12 bg-rayco-gold rounded-lg flex items-center justify-center">
                                <span className="text-rayco-forest font-bold text-xl">R</span>
                            </div>
                            <span className="font-bold text-2xl text-white">
                                Rayco<span className="text-rayco-gold">Graphix</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    'font-medium transition-colors duration-200',
                                    isActive(item.path)
                                        ? 'text-rayco-gold'
                                        : 'text-white/90 hover:text-rayco-gold'
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to={contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-rayco-gold text-black px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-rayco-gold/30"
                        >
                            Order via WhatsApp
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-rayco-gold p-2"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        'font-medium px-4 py-2',
                                        isActive(item.path)
                                            ? 'text-rayco-gold'
                                            : 'text-white/90 hover:text-rayco-gold'
                                    )}
                                    onClick={closeMenu}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to={contact.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-rayco-gold text-black px-6 py-3 rounded-full font-semibold text-center mx-4"
                                onClick={closeMenu}
                            >
                                Order via WhatsApp
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
