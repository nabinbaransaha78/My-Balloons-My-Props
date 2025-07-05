
const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">About</span> <span className="text-gray-800">MY Balloons MY Prop's</span>
          </h2>
          
          <div className="w-24 h-1 gradient-festive mx-auto mb-8 rounded-full"></div>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We are passionate celebration specialists with years of experience in creating magical moments 
            that last a lifetime. From intimate birthday gatherings to grand wedding celebrations, 
            we bring creativity, professionalism, and joy to every event.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🎂</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Birthday & Party Expert</h3>
              <p className="text-gray-600">
                Specializing in creating unforgettable birthday experiences with themed decorations, 
                custom balloon arrangements, and complete party setups that wow your guests.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">💍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Wedding Management</h3>
              <p className="text-gray-600">
                Comprehensive wedding planning and decoration services to make your special day perfect. 
                From elegant centerpieces to grand balloon arches, we handle every detail.
              </p>
            </div>
          </div>
          
          <div className="mt-16 p-8 bg-gradient-soft rounded-2xl">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h4>
            <p className="text-lg text-gray-700">
              To transform ordinary moments into extraordinary memories through creative decoration, 
              professional service, and an unwavering commitment to making every celebration special.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
