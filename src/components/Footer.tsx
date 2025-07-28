
import { Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/0b51edb6-cae2-4235-8932-10fca4da5ccd.png" 
                alt="MY Balloons MY Prop's Logo" 
                className="h-16 w-auto object-scale-down" 
              />
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for all things celebration! Creating magical moments and 
              unforgettable celebrations through expert event management and premium party props.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/myballoonsjayanagar" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" 
                title="Facebook"
              >
                <Facebook size={18} className="text-white" />
              </a>
              <a 
                href="https://www.instagram.com/myballoonsjayanagar" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" 
                title="Instagram"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a 
                href="https://www.youtube.com/@myballoonsjayanagar" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" 
                title="YouTube"
              >
                <Youtube size={18} className="text-white" />
              </a>
              <a 
                href="https://wa.me/919035106677?text=Hi%20MY%20Balloons%20MY%20Prop's!%20I'm%20interested%20in%20your%20services." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" 
                title="WhatsApp"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Event Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-brand-red">📞</span>
                <span className="text-gray-400">+91-9035106677</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-brand-yellow">✉️</span>
                <span className="text-gray-400">myballoonsjayanagar@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-brand-blue">📍</span>
                <span className="text-gray-400 text-sm leading-relaxed">
                  Srirama nilaya, 68, HAL Old Airport Rd, near doddanekundi signal, 
                  Jawahar Nagar, Marathahalli, Bengaluru, Karnataka 560037
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-400">⏰</span>
                <span className="text-gray-400">Mon-Sun: 9AM-9PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 MY Balloons MY Prop's. All rights reserved.
            </p>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Refund Policy</a>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              🎈 Let's make memories that last a lifetime — together! 🎉
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
