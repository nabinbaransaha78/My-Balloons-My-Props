import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, MapPin, DollarSign, Clock, CheckCircle, Star, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

interface EventPackage {
  id: string;
  name: string;
  description: string;
  price_range: string;
  features: string[];
  ideal_for: string[];
  image_url: string;
  popular: boolean;
}

interface EventTimeline {
  phase: string;
  duration: string;
  tasks: string[];
  description: string;
}

const EventPlanner = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [plannerForm, setPlannerForm] = useState({
    event_type: '',
    guest_count: '',
    budget_range: '',
    event_date: '',
    venue: '',
    special_requirements: ''
  });

  const eventPackages: EventPackage[] = [
    {
      id: 'basic',
      name: 'Essential Celebration',
      description: 'Perfect for intimate gatherings and small celebrations',
      price_range: '₹5,000 - ₹15,000',
      features: [
        'Basic balloon decorations',
        'Happy Birthday/Event banner',
        'Table setup for 20 guests',
        'Photo props (10 pieces)',
        'Setup and cleanup service'
      ],
      ideal_for: ['Small birthday parties', 'Family gatherings', 'Intimate celebrations'],
      image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      popular: false
    },
    {
      id: 'premium',
      name: 'Grand Celebration',
      description: 'Comprehensive event planning with premium decorations',
      price_range: '₹15,000 - ₹50,000',
      features: [
        'Premium balloon arch & centerpieces',
        'Custom themed decorations',
        'Professional photography backdrop',
        'Table & chair arrangements for 50 guests',
        'LED lighting setup',
        'Photo booth with 25 props',
        'Dedicated event coordinator',
        'Setup, event management & cleanup'
      ],
      ideal_for: ['Birthday parties', 'Anniversary celebrations', 'Baby showers', 'Corporate events'],
      image_url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      popular: true
    },
    {
      id: 'luxury',
      name: 'Royal Experience',
      description: 'Ultimate luxury event planning with exclusive services',
      price_range: '₹50,000 - ₹2,00,000',
      features: [
        'Custom theme design & execution',
        'Premium venue decoration',
        'Professional stage setup',
        'Advanced lighting & sound system',
        'Live entertainment coordination',
        'Catering arrangement support',
        'Professional photography/videography',
        'Guest management services',
        'Complete event planning & execution'
      ],
      ideal_for: ['Weddings', 'Large corporate events', 'Milestone celebrations', 'Product launches'],
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
      popular: false
    }
  ];

  const eventTimeline: EventTimeline[] = [
    {
      phase: 'Initial Consultation',
      duration: '1-2 days',
      tasks: [
        'Understand your vision and requirements',
        'Discuss budget and timeline',
        'Venue assessment (if needed)',
        'Provide detailed proposal'
      ],
      description: 'We start by understanding your dream event and creating a customized plan.'
    },
    {
      phase: 'Planning & Design',
      duration: '3-7 days',
      tasks: [
        'Theme and color scheme finalization',
        'Decoration layout design',
        'Vendor coordination',
        'Timeline creation',
        'Final approval from client'
      ],
      description: 'Our creative team designs every detail to match your vision perfectly.'
    },
    {
      phase: 'Preparation',
      duration: '1-3 days',
      tasks: [
        'Material procurement',
        'Quality checks',
        'Team briefing',
        'Final confirmations',
        'Backup planning'
      ],
      description: 'We prepare everything meticulously to ensure flawless execution.'
    },
    {
      phase: 'Event Day',
      duration: 'Event day',
      tasks: [
        'Early setup (2-4 hours before)',
        'Final touches and quality check',
        'Guest welcome coordination',
        'Live event management',
        'Post-event cleanup'
      ],
      description: 'On your special day, we handle everything so you can enjoy every moment.'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setPlannerForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, submit to backend
    navigate('/#contact');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Event Planning</span>
              <span className="text-gray-800"> Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to celebration, we handle every detail of your special event. 
              Choose from our curated packages or let us create a custom experience just for you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="packages" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="process">Our Process</TabsTrigger>
            <TabsTrigger value="calculator">Budget Calculator</TabsTrigger>
            <TabsTrigger value="planner">Quick Planner</TabsTrigger>
          </TabsList>

          {/* Event Packages */}
          <TabsContent value="packages" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Package</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer flexible packages to suit every celebration and budget. All packages include our signature attention to detail and professional service.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {eventPackages.map((pkg) => (
                <Card key={pkg.id} className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-brand-red' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute top-4 right-4 bg-brand-red text-white z-10">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="relative">
                    <img
                      src={pkg.image_url}
                      alt={pkg.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                      <p className="text-sm opacity-90">{pkg.price_range}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Ideal For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pkg.ideal_for.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className={`w-full ${pkg.popular ? 'bg-brand-red hover:bg-red-600' : 'bg-brand-blue hover:bg-blue-600'}`}
                      onClick={() => navigate('/#contact')}
                    >
                      Choose This Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-brand-yellow to-brand-red text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Need Something Custom?</h3>
                  <p className="mb-6">
                    Every event is unique! We create bespoke packages tailored to your specific needs, theme, and budget.
                  </p>
                  <Button 
                    className="bg-white text-brand-red hover:bg-gray-100"
                    onClick={() => navigate('/#contact')}
                  >
                    Request Custom Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Our Process */}
          <TabsContent value="process" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Event Planning Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We follow a proven process to ensure your event is perfectly planned and flawlessly executed.
              </p>
            </div>

            <div className="space-y-8">
              {eventTimeline.map((phase, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-brand-red text-white p-6 md:w-1/3">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-white text-brand-red rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold">{phase.phase}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-red-100">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{phase.duration}</span>
                        </div>
                      </div>
                      
                      <div className="p-6 md:w-2/3">
                        <p className="text-gray-600 mb-4">{phase.description}</p>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Activities:</h4>
                        <ul className="space-y-2">
                          {phase.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                className="bg-brand-red hover:bg-red-600"
                onClick={() => navigate('/#contact')}
              >
                Start Planning Your Event
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          {/* Budget Calculator */}
          <TabsContent value="calculator" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Budget Calculator</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get an estimated budget for your event based on your requirements. This helps you plan better and choose the right package.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Calculate Your Event Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select event type</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="wedding">Wedding</option>
                      <option value="baby_shower">Baby Shower</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="anniversary">Anniversary</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select guest count</option>
                      <option value="1-20">1-20 guests</option>
                      <option value="21-50">21-50 guests</option>
                      <option value="51-100">51-100 guests</option>
                      <option value="101-200">101-200 guests</option>
                      <option value="200+">200+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Decoration Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    <Card className="p-3 cursor-pointer hover:bg-brand-red hover:text-white transition-colors">
                      <div className="text-center">
                        <h4 className="font-semibold">Basic</h4>
                        <p className="text-xs">Simple decorations</p>
                      </div>
                    </Card>
                    <Card className="p-3 cursor-pointer hover:bg-brand-red hover:text-white transition-colors border-brand-red">
                      <div className="text-center">
                        <h4 className="font-semibold">Premium</h4>
                        <p className="text-xs">Enhanced setup</p>
                      </div>
                    </Card>
                    <Card className="p-3 cursor-pointer hover:bg-brand-red hover:text-white transition-colors">
                      <div className="text-center">
                        <h4 className="font-semibold">Luxury</h4>
                        <p className="text-xs">Full-service</p>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Estimated Budget Range</h4>
                  <div className="text-2xl font-bold text-brand-red">₹8,000 - ₹25,000</div>
                  <p className="text-sm text-gray-600 mt-2">
                    This is an approximate range. Final pricing depends on specific requirements and customizations.
                  </p>
                </div>

                <Button className="w-full bg-brand-red hover:bg-red-600">
                  Get Detailed Quote
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Planner */}
          <TabsContent value="planner" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Event Planner</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Share your event details with us and get a personalized planning consultation within 24 hours.
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Tell Us About Your Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={plannerForm.event_type}
                        onChange={(e) => handleInputChange('event_type', e.target.value)}
                      >
                        <option value="">Select event type</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="wedding">Wedding</option>
                        <option value="baby_shower">Baby Shower</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Guests</label>
                      <Input
                        placeholder="e.g., 50"
                        value={plannerForm.guest_count}
                        onChange={(e) => handleInputChange('guest_count', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={plannerForm.budget_range}
                        onChange={(e) => handleInputChange('budget_range', e.target.value)}
                      >
                        <option value="">Select budget range</option>
                        <option value="5000-15000">₹5,000 - ₹15,000</option>
                        <option value="15000-30000">₹15,000 - ₹30,000</option>
                        <option value="30000-50000">₹30,000 - ₹50,000</option>
                        <option value="50000+">₹50,000+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                      <Input
                        type="date"
                        value={plannerForm.event_date}
                        onChange={(e) => handleInputChange('event_date', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue/Location</label>
                    <Input
                      placeholder="e.g., Home, Community Hall, Hotel"
                      value={plannerForm.venue}
                      onChange={(e) => handleInputChange('venue', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                    <Textarea
                      placeholder="Tell us about your theme preferences, special needs, or any specific requirements..."
                      rows={4}
                      value={plannerForm.special_requirements}
                      onChange={(e) => handleInputChange('special_requirements', e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-brand-red hover:bg-red-600">
                    Get My Event Plan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default EventPlanner;