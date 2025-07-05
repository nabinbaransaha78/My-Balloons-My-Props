
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-festive rounded-full flex items-center justify-center animate-bounce-gentle">
              <span className="text-white font-bold text-xl">🎈</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MY Balloons</h1>
              <p className="text-sm text-gray-600">MY Prop's</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-brand-red transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-brand-yellow transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-brand-blue transition-colors font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('props')}
              className="text-gray-700 hover:text-brand-red transition-colors font-medium"
            >
              Props Shop
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-brand-yellow transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-brand-red hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get Quote
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
