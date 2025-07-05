
const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-festive rounded-full flex items-center justify-center animate-bounce-gentle">
                <span className="text-white font-bold text-xl">🎈</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">MY Balloons</h1>
                <p className="text-gray-400">MY Prop's</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for all things celebration! Creating magical moments and 
              unforgettable celebrations through expert event management and premium party props.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" title="Facebook">
                <span className="text-white font-bold text-sm">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" title="Instagram">
                <span className="text-white font-bold">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" title="YouTube">
                <span className="text-white font-bold">📹</span>
              </a>
              <a href="https://wa.me/919035106677" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200" title="WhatsApp">
                <span className="text-white font-bold">💬</span>
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
                  onClick={() => scrollToSection('props')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Shop Props
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
                <span className="text-gray-400">info@myballons.in</span>
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
                <span className="text-gray-400">Mon-Sun: 9AM-8PM</span>
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
