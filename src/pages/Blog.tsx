import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, ArrowRight, Tag, Heart, Share2, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featured_image: string;
  published_date: string;
  read_time: number;
  views: number;
  likes: number;
  is_featured: boolean;
}

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Sample blog data - in real app, fetch from database
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '10 Creative Birthday Party Themes That Will Wow Your Guests',
      excerpt: 'Discover unique and creative birthday party themes that will make your celebration unforgettable. From magical unicorns to superhero adventures.',
      content: `Planning a birthday party that stands out from the crowd? Look no further! We've compiled the most creative and engaging birthday party themes that will leave your guests talking for months.

## 1. Enchanted Garden Theme
Transform your space into a magical garden with fairy lights, artificial flowers, and woodland creatures. Perfect for nature-loving kids and adults alike.

## 2. Superhero Academy
Create a training ground for future superheroes with obstacle courses, cape-making stations, and villain-defeating games.

## 3. Under the Sea Adventure
Dive deep into an oceanic wonderland with blue decorations, sea creature props, and mermaid tails for the birthday star.

## 4. Space Explorer Mission
Blast off to the stars with silver and blue decorations, planet props, and astronaut helmets for all guests.

## 5. Vintage Carnival
Bring the circus to your backyard with striped tents, popcorn machines, and classic carnival games.

Each theme comes with our complete decoration package, including balloons, banners, props, and setup service. Contact us to make your vision come to life!`,
      author: 'Priya Sharma',
      category: 'Birthday Parties',
      tags: ['birthday', 'themes', 'decoration', 'kids party'],
      featured_image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
      published_date: '2024-01-15',
      read_time: 5,
      views: 1250,
      likes: 89,
      is_featured: true
    },
    {
      id: '2',
      title: 'Wedding Decoration Trends 2024: What\'s Hot This Season',
      excerpt: 'Stay ahead of the curve with the latest wedding decoration trends. From sustainable decor to bold color palettes.',
      content: `Wedding trends are constantly evolving, and 2024 brings some exciting new directions in decoration and styling. Here are the top trends we're seeing this season.

## Sustainable and Eco-Friendly Decor
Couples are increasingly choosing environmentally conscious options, including biodegradable balloons, potted plants instead of cut flowers, and reusable decorative elements.

## Bold Color Combinations
Gone are the days of all-white weddings. This year, we're seeing vibrant combinations like emerald green with gold, deep burgundy with blush pink, and navy blue with copper accents.

## Micro Weddings with Maximum Impact
Smaller guest lists mean more budget for stunning decorations. We're creating intimate setups that feel grand and luxurious.

## Interactive Elements
Photo booths, live painting stations, and DIY flower crown bars are becoming must-haves for modern weddings.

Let us help you incorporate these trends into your special day with our expert planning and decoration services.`,
      author: 'Rajesh Kumar',
      category: 'Weddings',
      tags: ['wedding', 'trends', '2024', 'decoration'],
      featured_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop',
      published_date: '2024-01-10',
      read_time: 7,
      views: 2100,
      likes: 156,
      is_featured: true
    },
    {
      id: '3',
      title: 'DIY vs Professional Event Planning: Making the Right Choice',
      excerpt: 'Weighing the pros and cons of DIY event planning versus hiring professionals. Get insights to make the best decision for your celebration.',
      content: `Planning an event can be exciting, but it also comes with many decisions. One of the biggest questions is whether to go DIY or hire professionals. Let's break it down.

## DIY Event Planning

### Pros:
- Complete creative control
- Potential cost savings
- Personal satisfaction
- Flexibility in timing

### Cons:
- Time-intensive
- Stress and pressure
- Limited vendor connections
- Risk of overlooking details

## Professional Event Planning

### Pros:
- Expertise and experience
- Vendor relationships
- Stress-free experience
- Professional execution
- Emergency handling

### Cons:
- Higher upfront cost
- Less direct control
- Communication requirements

## Our Recommendation
For small, intimate gatherings, DIY can work well. For larger events or special occasions like weddings and milestone birthdays, professional planning ensures everything runs smoothly.

We offer flexible packages that can complement your DIY efforts or handle everything from start to finish.`,
      author: 'Sneha Reddy',
      category: 'Event Planning',
      tags: ['DIY', 'professional', 'planning', 'tips'],
      featured_image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=400&fit=crop',
      published_date: '2024-01-05',
      read_time: 6,
      views: 890,
      likes: 67,
      is_featured: false
    },
    {
      id: '4',
      title: 'Baby Shower Decoration Ideas That Create Magical Moments',
      excerpt: 'Sweet and adorable baby shower decoration ideas that celebrate the upcoming arrival. From gender reveals to themed celebrations.',
      content: `A baby shower is one of life's most joyful celebrations. Here are our favorite decoration ideas that create the perfect atmosphere for welcoming a new little one.

## Gender Neutral Themes
- Sunshine and Rainbows
- Little Star
- Woodland Animals
- Hot Air Balloons

## For Baby Girls
- Princess Castle
- Butterfly Garden
- Unicorn Dreams
- Floral Paradise

## For Baby Boys
- Little Prince
- Safari Adventure
- Nautical Theme
- Superhero Baby

## Interactive Elements
- Wishes Tree where guests write advice
- Photo timeline of pregnancy journey
- Guess the Baby Food game station
- Diaper cake centerpiece

## Color Schemes That Work
Soft pastels remain popular, but we're also seeing bold, modern color combinations that photograph beautifully.

Our baby shower packages include everything from balloons and banners to table settings and photo props.`,
      author: 'Meera Patel',
      category: 'Baby Showers',
      tags: ['baby shower', 'decoration', 'themes', 'gender reveal'],
      featured_image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      published_date: '2024-01-01',
      read_time: 4,
      views: 1450,
      likes: 112,
      is_featured: false
    },
    {
      id: '5',
      title: 'Corporate Event Success: Creating Professional Yet Fun Atmospheres',
      excerpt: 'Learn how to balance professionalism with engagement in corporate events. Tips for team building, product launches, and company celebrations.',
      content: `Corporate events don't have to be boring! Here's how we help companies create memorable experiences that boost morale and strengthen relationships.

## Types of Corporate Events We Excel At
- Product launches
- Team building events
- Annual parties
- Award ceremonies
- Client appreciation events
- Conference decorations

## Key Elements for Success

### Professional Branding
We incorporate your company colors, logo, and messaging seamlessly into the decoration scheme.

### Interactive Zones
- Networking areas with comfortable seating
- Photo opportunities with branded backdrops
- Activity stations for team building
- Refreshment areas with elegant setups

### Technology Integration
- LED displays for presentations
- Sound system coordination
- Lighting that enhances the mood
- Live streaming setup for virtual attendees

## Budget-Friendly Tips
- Focus on high-impact areas like entrance and stage
- Use company swag as decoration elements
- Opt for reusable branded materials
- Choose versatile color schemes

Our corporate event team understands the unique needs of business celebrations and delivers results that impress clients and employees alike.`,
      author: 'Arjun Singh',
      category: 'Corporate Events',
      tags: ['corporate', 'professional', 'team building', 'branding'],
      featured_image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop',
      published_date: '2023-12-28',
      read_time: 8,
      views: 756,
      likes: 43,
      is_featured: false
    }
  ];

  const categories = ['all', 'Birthday Parties', 'Weddings', 'Baby Showers', 'Corporate Events', 'Event Planning'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.is_featured);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    // In a real app, you'd navigate to a dedicated blog post page
    // navigate(`/blog/${post.id}`);
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // toast.success('Link copied to clipboard!');
    }
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <Button
              variant="ghost"
              onClick={() => setSelectedPost(null)}
              className="mb-6 flex items-center gap-2"
            >
              ← Back to Blog
            </Button>
            
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={selectedPost.featured_image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-brand-red text-white">{selectedPost.category}</Badge>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedPost.published_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="h-4 w-4" />
                    {selectedPost.read_time} min read
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
                
                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      {selectedPost.likes}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare(selectedPost)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  {selectedPost.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.trim() === '') {
                      return <br key={index} />;
                    }
                    return <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
                  })}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </article>
            
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Plan Your Event?</h3>
              <p className="text-gray-600 mb-4">
                Get inspired by our blog? Let's bring your vision to life! Contact us for a free consultation.
              </p>
              <div className="flex gap-4">
                <Button 
                  className="bg-brand-red hover:bg-red-600"
                  onClick={() => navigate('/#contact')}
                >
                  Get Free Quote
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://wa.me/919035106677?text=Hi! I read your blog and want to discuss my event planning needs.', '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Event Planning</span>
              <span className="text-gray-800"> Blog & Tips</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover expert tips, creative ideas, and inspiration for your next celebration. 
              From birthday parties to weddings, we share our knowledge to help you create magical moments.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search articles..."
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
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-brand-red text-white">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="h-4 w-4" />
                        {post.read_time} min read
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReadMore(post)}
                        className="text-brand-red hover:text-red-600"
                      >
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Articles' : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <div className="relative">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-brand-blue text-white">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.published_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="h-4 w-4" />
                      {post.read_time} min
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        👁️ {post.views}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReadMore(post)}
                      className="text-brand-red hover:text-red-600"
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500 text-sm">{post.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No articles found</p>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-brand-red to-brand-yellow p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Event Planning Tips!</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Get the latest decoration trends, planning tips, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white text-gray-900"
            />
            <Button className="bg-white text-brand-red hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;