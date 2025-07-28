
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-soft"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&h=1080&fit=crop')"
        }}
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/34c11f5d-7c74-4a25-b9ad-718f3279b247.png" 
              alt="MY Balloons MY Prop's" 
              className="h-24 mx-auto mb-6"
            />
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" itemProp="name">
            <span className="text-gradient">Celebrations</span>
            <br />
            <span className="text-gray-800">Made Magical</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-medium" itemProp="description">
            From intimate birthday parties to grand weddings, we bring your celebrations to life with 
            <span className="text-brand-red font-semibold"> expert event management</span> and 
            <span className="text-brand-blue font-semibold"> premium party props</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToContact}
              className="bg-brand-red hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Plan Your Event</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => navigate('/props-store')}
              variant="outline"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Shop Props</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🎈</span>
              <span className="font-medium">500+ Happy Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">⭐</span>
              <span className="font-medium">5-Star Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🚚</span>
              <span className="font-medium">Bangalore Delivery</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-6xl animate-bounce text-brand-yellow opacity-60">🎈</div>
      <div className="absolute top-32 right-16 text-4xl animate-bounce text-brand-red opacity-60" style={{animationDelay: '1s'}}>🎉</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-bounce text-brand-blue opacity-60" style={{animationDelay: '2s'}}>🎊</div>
      <div className="absolute bottom-32 right-10 text-6xl animate-bounce text-brand-yellow opacity-60" style={{animationDelay: '0.5s'}}>🎁</div>
    </section>
  );
};

export default Hero;
