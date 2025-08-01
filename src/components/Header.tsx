
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth, SignInButton } from '@clerk/clerk-react';

const Header = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                alt="MY Balloons MY Prop's Logo" 
                className="h-10 lg:h-12 w-auto" 
                src="/lovable-uploads/34c11f5d-7c74-4a25-b9ad-718f3279b247.png" 
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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
              onClick={() => navigateToPage('/gallery')} 
              className="text-gray-700 hover:text-brand-yellow transition-colors font-medium"
              aria-label="Go to Gallery page"
            >
              Gallery
            </button>
            <button 
              onClick={() => navigateToPage('/blog')} 
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

          <div className="flex items-center space-x-3">
            {/* Desktop CTA Button */}
            {isSignedIn ? (
              <Button 
                onClick={() => navigateToPage('/admin')}
                className="hidden lg:flex bg-brand-red hover:bg-red-600 text-white px-4 xl:px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm xl:text-base"
                aria-label="Go to admin panel"
              >
                Admin Panel
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button 
                  className="hidden lg:flex bg-brand-red hover:bg-red-600 text-white px-4 xl:px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm xl:text-base"
                  aria-label="Login to admin panel"
                >
                  Login
                </Button>
              </SignInButton>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-t">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-red transition-colors font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-yellow transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-blue transition-colors font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => navigateToPage('/gallery')} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-yellow transition-colors font-medium"
              >
                Gallery
              </button>
              <button 
                onClick={() => navigateToPage('/blog')} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-blue transition-colors font-medium"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left py-2 text-gray-700 hover:text-brand-yellow transition-colors font-medium"
              >
                Contact
              </button>
              <div className="pt-3 border-t">
                {isSignedIn ? (
                  <Button 
                    onClick={() => navigateToPage('/admin')}
                    className="w-full bg-brand-red hover:bg-red-600 text-white py-3 rounded-full transition-all duration-300 shadow-lg"
                  >
                    Admin Panel
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button 
                      className="w-full bg-brand-red hover:bg-red-600 text-white py-3 rounded-full transition-all duration-300 shadow-lg"
                    >
                      Login
                    </Button>
                  </SignInButton>
                )}
              </div>
            </nav>
          </div>
        )}
        </div>
      </header>
  );
};

export default Header;
