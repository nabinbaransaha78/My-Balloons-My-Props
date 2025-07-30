
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              alt="MY Balloons MY Prop's Logo" 
              className="h-12 w-auto" 
              src="/lovable-uploads/34c11f5d-7c74-4a25-b9ad-718f3279b247.png" 
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-gray-700 hover:text-brand-red transition-colors font-medium"
              aria-label="Go to Home section"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-700 hover:text-brand-yellow transition-colors font-medium"
              aria-label="Go to About section"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-gray-700 hover:text-brand-blue transition-colors font-medium"
              aria-label="Go to Services section"
            >
              Services
            </button>
            <button 
              onClick={() => window.location.href = '/gallery'} 
              className="text-gray-700 hover:text-brand-yellow transition-colors font-medium"
              aria-label="Go to Gallery page"
            >
              Gallery
            </button>
            <button 
              onClick={() => window.location.href = '/blog'} 
              className="text-gray-700 hover:text-brand-blue transition-colors font-medium"
              aria-label="Go to Blog page"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-700 hover:text-brand-yellow transition-colors font-medium"
              aria-label="Go to Contact section"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <Button 
            onClick={() => scrollToSection('contact')} 
            className="bg-brand-red hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            aria-label="Get a quote for your event"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
