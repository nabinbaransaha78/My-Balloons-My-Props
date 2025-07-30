import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const Services = () => {
  const navigate = useNavigate();
  
  const services = [{
    icon: '🎂',
    title: 'Birthday Party Planning',
    description: 'Fun themes, balloons, cakes, and games — planned with love! Complete birthday party management with memorable experiences.',
    color: 'from-red-50 to-pink-50',
    buttonColor: 'bg-brand-red hover:bg-red-600'
  }, {
    icon: '💍',
    title: 'Wedding & Engagement Events',
    description: 'Elegant decor, stage setup, lights & more for your big day. Complete wedding planning with fairy-tale touches.',
    color: 'from-blue-50 to-indigo-50',
    buttonColor: 'bg-brand-blue hover:bg-blue-600'
  }, {
    icon: '🎉',
    title: 'Corporate Events',
    description: 'Professional event setups for launches, parties, and conferences. Sophisticated planning for business celebrations.',
    color: 'from-yellow-50 to-orange-50',
    buttonColor: 'bg-brand-yellow hover:bg-yellow-600'
  }, {
    icon: '🧸',
    title: 'Baby Showers & Gender Reveals',
    description: 'Cute and creative themes to welcome the little one. Adorable decorations for precious moments.',
    color: 'from-pink-50 to-rose-50',
    buttonColor: 'bg-pink-500 hover:bg-pink-600'
  }];
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" itemProp="headline">
            <span className="text-gradient">✨ What We</span> <span className="text-gray-800">Offer</span>
          </h2>
          
          <div className="w-24 h-1 gradient-festive mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4" itemProp="description">
            Each service comes with <strong>customizable packages</strong> and end-to-end management.
          </p>
          <p className="text-lg text-gray-600">
            We bring creativity, color, and class to every occasion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12" itemScope itemType="https://schema.org/ItemList">
          {services.map((service, index) => <div key={index} className={`bg-gradient-to-br ${service.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}>
              <div className="text-5xl mb-6 group-hover:animate-bounce-gentle">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4" itemProp="name">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed" itemProp="description">
                {service.description}
              </p>
              
              <Button onClick={scrollToContact} className={`${service.buttonColor} text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg w-full`}>
                Book Now
              </Button>
            </div>)}
        </div>

        <div className="text-center">
          <div className="bg-gradient-soft p-8 rounded-2xl shadow-lg inline-block max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Planning?</h3>
            <p className="text-gray-600 mb-6">
              Use our interactive event planner to get instant quotes and timeline estimates for your celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/event-planner')}
                className="bg-brand-blue hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Use Event Planner
              </Button>
              <Button 
                onClick={() => navigate('/gallery')}
                variant="outline"
                className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Services;