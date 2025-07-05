
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: '🎂',
      title: 'Birthday Parties',
      description: 'Complete birthday party planning with themed decorations, balloon arrangements, and entertainment setup.',
      color: 'from-red-50 to-pink-50',
      buttonColor: 'bg-brand-red hover:bg-red-600'
    },
    {
      icon: '💍',
      title: 'Wedding Events',
      description: 'Elegant wedding decorations, floral arrangements, and complete venue transformation for your special day.',
      color: 'from-blue-50 to-indigo-50',
      buttonColor: 'bg-brand-blue hover:bg-blue-600'
    },
    {
      icon: '🏢',
      title: 'Corporate Events',
      description: 'Professional corporate event management with sophisticated decorations and brand-aligned themes.',
      color: 'from-yellow-50 to-orange-50',
      buttonColor: 'bg-brand-yellow hover:bg-yellow-600'
    },
    {
      icon: '🎭',
      title: 'Theme Parties',
      description: 'Custom themed decorations for any occasion - from superhero parties to elegant galas.',
      color: 'from-purple-50 to-pink-50',
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: '🎓',
      title: 'Graduation Celebrations',
      description: 'Celebrate academic achievements with custom decorations and memorable photo setups.',
      color: 'from-green-50 to-emerald-50',
      buttonColor: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: '🍼',
      title: 'Baby Showers',
      description: 'Adorable baby shower decorations with soft themes and beautiful balloon arrangements.',
      color: 'from-pink-50 to-rose-50',
      buttonColor: 'bg-pink-500 hover:bg-pink-600'
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Our</span> <span className="text-gray-800">Services</span>
          </h2>
          
          <div className="w-24 h-1 gradient-festive mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we provide comprehensive event management 
            and decoration services tailored to your vision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${service.color} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className="text-5xl mb-6 group-hover:animate-bounce-gentle">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <Button 
                onClick={scrollToContact}
                className={`${service.buttonColor} text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg w-full`}
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Custom Events</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Don't see your event type? We specialize in custom celebrations for any occasion!
            </p>
            <Button 
              onClick={scrollToContact}
              className="bg-gradient-festive text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Discuss Your Event
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
