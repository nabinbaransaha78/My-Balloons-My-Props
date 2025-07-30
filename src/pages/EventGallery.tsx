import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Filter, Heart, Share2, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
  event_date: string;
  location: string;
  client_name: string;
  tags: string[];
  likes: number;
  is_featured: boolean;
}

const EventGallery = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      title: 'Magical Unicorn Birthday Party',
      category: 'Birthday Parties',
      image_url: '/lovable-uploads/d85a72bc-eea7-4ede-9fae-e63447a9103c.png',
      description: 'A dreamy unicorn-themed birthday party with pastel balloons, rainbow decorations, and magical props.',
      event_date: '2024-01-15',
      location: 'Jayanagar, Bangalore',
      client_name: 'Priya & Family',
      tags: ['unicorn', 'birthday', 'kids', 'magical', 'pastel'],
      likes: 156,
      is_featured: true
    },
    {
      id: '2',
      title: 'Elegant Wedding Reception Setup',
      category: 'Weddings',
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      description: 'Sophisticated wedding reception with gold and white theme, featuring elegant balloon arches and floral arrangements.',
      event_date: '2024-01-10',
      location: 'Whitefield, Bangalore',
      client_name: 'Rahul & Sneha',
      tags: ['wedding', 'elegant', 'gold', 'white', 'reception'],
      likes: 234,
      is_featured: true
    },
    {
      id: '3',
      title: 'Corporate Annual Day Celebration',
      category: 'Corporate Events',
      image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      description: 'Professional corporate event setup with branded decorations and modern staging.',
      event_date: '2024-01-08',
      location: 'Electronic City, Bangalore',
      client_name: 'TechCorp Solutions',
      tags: ['corporate', 'professional', 'branding', 'modern'],
      likes: 89,
      is_featured: false
    },
    {
      id: '4',
      title: 'Sweet Baby Shower Celebration',
      category: 'Baby Showers',
      image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      description: 'Adorable baby shower with soft pink and gold decorations, featuring teddy bear props and balloon clouds.',
      event_date: '2024-01-05',
      location: 'Koramangala, Bangalore',
      client_name: 'Meera & Arjun',
      tags: ['baby shower', 'pink', 'gold', 'teddy bears', 'clouds'],
      likes: 178,
      is_featured: true
    },
    {
      id: '5',
      title: 'Superhero Adventure Birthday',
      category: 'Birthday Parties',
      image_url: 'https://images.unsplash.com/photo-1583342926306-3b1185e0c4a1?w=800&h=600&fit=crop',
      description: 'Action-packed superhero birthday party with comic book decorations and hero training stations.',
      event_date: '2024-01-03',
      location: 'Indiranagar, Bangalore',
      client_name: 'Vikram & Family',
      tags: ['superhero', 'birthday', 'action', 'comic', 'adventure'],
      likes: 145,
      is_featured: false
    },
    {
      id: '6',
      title: 'Garden Wedding Ceremony',
      category: 'Weddings',
      image_url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop',
      description: 'Beautiful outdoor garden wedding with natural decorations and rustic charm.',
      event_date: '2023-12-28',
      location: 'Mysore Road, Bangalore',
      client_name: 'Anita & Suresh',
      tags: ['garden', 'outdoor', 'natural', 'rustic', 'ceremony'],
      likes: 201,
      is_featured: false
    },
    {
      id: '7',
      title: 'Princess Castle Birthday Party',
      category: 'Birthday Parties',
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      description: 'Fairy tale princess party with castle backdrop, royal decorations, and magical atmosphere.',
      event_date: '2023-12-25',
      location: 'Marathahalli, Bangalore',
      client_name: 'Kavya & Family',
      tags: ['princess', 'castle', 'fairy tale', 'royal', 'magical'],
      likes: 189,
      is_featured: true
    },
    {
      id: '8',
      title: 'Modern Minimalist Wedding',
      category: 'Weddings',
      image_url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
      description: 'Clean, modern wedding setup with geometric decorations and monochrome color scheme.',
      event_date: '2023-12-20',
      location: 'HSR Layout, Bangalore',
      client_name: 'Rohan & Divya',
      tags: ['modern', 'minimalist', 'geometric', 'monochrome', 'clean'],
      likes: 167,
      is_featured: false
    }
  ];

  const categories = ['all', 'Birthday Parties', 'Weddings', 'Baby Showers', 'Corporate Events'];

  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredImages = galleryImages.filter(image => image.is_featured);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const handleLike = (imageId: string) => {
    setLikedImages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId);
      } else {
        newLiked.add(imageId);
      }
      return newLiked;
    });
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentImageIndex + 1) % filteredImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Event Gallery</span>
              <span className="text-gray-800"> & Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our stunning collection of events we've brought to life. From intimate celebrations 
              to grand festivities, see how we transform visions into magical realities.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by event type, theme, or style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Gallery */}
        {featuredImages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      onClick={() => handleImageClick(image)}
                    />
                    <Badge className="absolute top-4 left-4 bg-brand-red text-white">
                      Featured
                    </Badge>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/80 hover:bg-white h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(image.id);
                        }}
                      >
                        <Heart className={`h-4 w-4 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{image.category}</Badge>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-brand-red transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{image.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{image.location}</span>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Gallery */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Events' : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {filteredImages.length} event{filteredImages.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="relative">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onClick={() => handleImageClick(image)}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/80 hover:bg-white h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(image.id);
                      }}
                    >
                      <Heart className={`h-3 w-3 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-brand-blue text-white text-xs">
                      {image.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 group-hover:text-brand-red transition-colors line-clamp-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">{image.client_name}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(image.event_date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {image.likes + (likedImages.has(image.id) ? 1 : 0)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No events found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-brand-red to-brand-yellow p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Love What You See?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Ready to create your own magical event? Let's discuss your vision and bring it to life with our expert planning and decoration services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-brand-red hover:bg-gray-100"
              onClick={() => navigate('/#contact')}
            >
              Plan My Event
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-red"
              onClick={() => navigate('/props-store')}
            >
              Shop Props
            </Button>
          </div>
        </section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
            <div className="relative">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2">{selectedImage.category}</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(selectedImage.id)}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${likedImages.has(selectedImage.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    {selectedImage.likes + (likedImages.has(selectedImage.id) ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Client:</span>
                  <p className="text-gray-600">{selectedImage.client_name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Location:</span>
                  <p className="text-gray-600">{selectedImage.location}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Date:</span>
                  <p className="text-gray-600">{new Date(selectedImage.event_date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <span className="font-semibold text-gray-700 text-sm">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedImage.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  Inspired by this event? Let's create something amazing for your celebration!
                </p>
                <div className="flex gap-3">
                  <Button 
                    className="bg-brand-red hover:bg-red-600"
                    onClick={() => {
                      setSelectedImage(null);
                      navigate('/#contact');
                    }}
                  >
                    Get Similar Setup
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://wa.me/919035106677?text=Hi! I saw your gallery and want to discuss a similar event setup.', '_blank')}
                  >
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </div>
  );
};

export default EventGallery;