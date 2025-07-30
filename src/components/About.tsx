import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();
  
  return (
    <section id="about" className="py-20 bg-white" itemScope itemType="https://schema.org/AboutPage">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6" itemProp="headline">
            <span className="text-gradient">🎈 About</span> <span className="text-gray-800">MY Balloons MY Prop's</span>
          </h2>
          
          <div className="w-16 lg:w-24 h-1 gradient-festive mx-auto mb-6 lg:mb-8 rounded-full"></div>
          
          <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed px-2" itemProp="description">
            We are your one-stop destination for all things celebration! 
            At <strong>MY Balloons MY Prop's</strong>, we specialize in <em>event management</em> and <em>decor prop sales</em> to make your moments truly magical. 
            Whether it's a fairy-tale wedding, a themed birthday, or a corporate event, we bring creativity, color, and class to every occasion.
          </p>
          
          <p className="text-sm lg:text-lg text-gray-600 mb-8 lg:mb-12 leading-relaxed px-2" itemProp="text">
            With years of experience and a love for happiness, we've become a trusted name for joyful planning and delightful props.
          </p>
          
          <div className="text-lg lg:text-2xl font-semibold text-gradient mb-12 lg:mb-16 px-2">
            Let's make memories that last a lifetime — together!
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12 lg:mt-16">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl lg:text-4xl mb-4">🎂</div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Event Management Expert</h3>
              <p className="text-sm lg:text-base text-gray-600">
                From intimate birthday gatherings to grand wedding celebrations, 
                we bring creativity, professionalism, and joy to every event with end-to-end planning.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl lg:text-4xl mb-4">🛍️</div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">Props & Decor Store</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Shop premium party supplies and photo props online. From balloons to banners, 
                we've got everything you need to make your celebration special.
              </p>
            </div>
          </div>
          
          {/* Additional Engagement Section */}
          <div className="mt-12 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl lg:text-4xl mb-4">📚</div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">Event Planning Blog</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4">
                Get expert tips, trends, and inspiration for your next celebration.
              </p>
              <Button 
                onClick={() => navigate('/blog')}
                variant="outline"
                size="sm"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-sm"
              >
                Read Our Blog
              </Button>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl lg:text-4xl mb-4">🎯</div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">Event Planner Tool</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4">
                Use our interactive planner to estimate costs and plan your event.
              </p>
              <Button 
                onClick={() => navigate('/event-planner')}
                variant="outline"
                size="sm"
                className="border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-white text-sm"
              >
                Plan Your Event
              </Button>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl lg:text-4xl mb-4">📸</div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">Complete Gallery</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-4">
                Explore our extensive portfolio of successful events and celebrations.
              </p>
              <Button 
                onClick={() => navigate('/gallery')}
                variant="outline"
                size="sm"
                className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
