import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Gallery = () => {
  const navigate = useNavigate();
  
  const galleryImages = [
    {
      url: '/lovable-uploads/d85a72bc-eea7-4ede-9fae-e63447a9103c.png',
      title: 'Birthday Balloon Setups',
      description: 'Colorful balloon decorations for magical birthday parties'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      title: 'Wedding Entrances',
      description: 'Elegant wedding decorations with stunning entrance setups'
    },
    {
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop',
      title: 'Corporate Event Stages',
      description: 'Professional corporate event setups and stage decorations'
    },
    {
      url: 'https://images.unsplash.com/photo-1583342926306-3b1185e0c4a1?w=400&h=300&fit=crop',
      title: 'Kids Party Stages',
      description: 'Fun and colorful themed decorations for children\'s parties'
    },
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      title: 'Customers with Props',
      description: 'Happy customers enjoying our photo booth props'
    },
    {
      url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
      title: 'Event Celebrations',
      description: 'Memorable moments from various celebrations we\'ve organized'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      event: 'Wedding Reception',
      rating: 5,
      text: 'Absolutely amazing! They transformed our venue into a fairy tale. Every detail was perfect and our guests were in awe. Best wedding planners in Bangalore!'
    },
    {
      name: 'Rajesh Kumar',
      event: 'Birthday Party',
      rating: 5,
      text: 'Best birthday party ever! The balloon arrangements were incredible and the kids had so much fun. Highly recommended for any celebration!'
    },
    {
      name: 'Sneha Reddy',
      event: 'Corporate Event',
      rating: 5,
      text: 'Professional, creative, and reliable. They delivered exactly what we envisioned for our company celebration. Will definitely book again!'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            <span className="text-gradient">📸 Moments We've</span> <span className="text-gray-800">Created</span>
          </h2>
          
          <div className="w-16 lg:w-24 h-1 gradient-festive mx-auto mb-6 lg:mb-8 rounded-full"></div>
          
          <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Showcase beautiful photos from past events including birthday balloon setups, 
            wedding entrances, kids' party stages, and customers holding props.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-16 lg:mb-20">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-100"
            >
              <div className="aspect-square sm:aspect-[4/3] w-full">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 lg:bottom-4 left-2 lg:left-4 text-white">
                  <h3 className="text-lg lg:text-xl font-semibold mb-1">{image.title}</h3>
                  <p className="text-xs lg:text-sm text-gray-200 hidden sm:block">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Gallery Button */}
        <div className="text-center mt-8 lg:mt-12 px-4">
          <Button 
            onClick={() => navigate('/gallery')}
            className="bg-brand-blue hover:bg-blue-600 text-white px-6 lg:px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm lg:text-base"
          >
            View Complete Gallery
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 text-gray-800">
            What Our Clients Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-brand-yellow text-lg lg:text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div>
                  <div className="font-semibold text-gray-800 text-sm lg:text-base">{testimonial.name}</div>
                  <div className="text-xs lg:text-sm text-gray-500">{testimonial.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
