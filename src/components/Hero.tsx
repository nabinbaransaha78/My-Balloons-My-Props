
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-soft"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
      
      {/* Floating Balloons */}
      <div className="absolute top-20 left-10 text-6xl animate-float">🎈</div>
      <div className="absolute top-32 right-20 text-4xl animate-float" style={{animationDelay: '1s'}}>🎉</div>
      <div className="absolute bottom-32 left-20 text-5xl animate-float" style={{animationDelay: '2s'}}>🎊</div>
      <div className="absolute top-40 left-1/2 text-3xl animate-float" style={{animationDelay: '0.5s'}}>✨</div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="text-gradient">🎉 Celebrate Every</span>
          <br />
          <span className="text-gray-800">Moment with Us!</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          From elegant weddings to fun-filled birthdays, and from grand events to the tiniest joyful detail — 
          we make every celebration unforgettable!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('contact')}
            size="lg"
            className="bg-brand-red hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            🎯 Plan Your Event
          </Button>
          
          <Button 
            onClick={() => scrollToSection('props')}
            variant="outline"
            size="lg"
            className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            🛍️ Shop Props
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-red">500+</div>
            <div className="text-gray-600">Events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-yellow">5★</div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-blue">100+</div>
            <div className="text-gray-600">Props</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
