import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, ArrowLeft, Search, X, Heart, 
  Grid3X3, List, SlidersHorizontal, Package,
  Truck, Shield, RotateCcw, Zap, Filter, Star,
  Plus, Minus, Eye, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartModal from '@/components/CartModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PropsStore = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('is_active', true);
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  const filteredProducts = products.filter(product => {
    if (!product || typeof product.name !== 'string' || typeof product.price !== 'number') {
      return false;
    }

    const matchesCategory = selectedCategory === 'all' || 
      product.categories?.name === selectedCategory;

    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      default:
        return 0;
    }
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock_quantity) {
          toast.error('Cannot add more items - stock limit reached');
          return prevCart;
        }
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success('Added to cart!');
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.stock_quantity) }
          : item
      )
    );
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const clearSearch = () => setSearchQuery('');

  const ProductCard = ({ product }: { product: Product }) => {
    const cartItem = cart.find(item => item.id === product.id);
    const cartQuantity = cartItem?.quantity || 0;

    return (
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.categories && (
            <Badge className="absolute top-2 left-2 bg-brand-blue text-white text-xs">
              {product.categories.name}
            </Badge>
          )}
          
          {product.stock_quantity < 5 && product.stock_quantity > 0 && (
            <Badge className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs">
              Only {product.stock_quantity} left
            </Badge>
          )}
          
          {product.stock_quantity === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="bg-red-500 text-white">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.8)</span>
          </div>
          
          <h3 className="font-semibold text-sm lg:text-base mb-2 line-clamp-2 leading-tight flex-1">
            {product.name}
          </h3>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg lg:text-xl font-bold text-brand-red">
              ₹{product.price}
            </span>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Truck className="h-3 w-3" />
              <span>Fast Delivery</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-3">
            Stock: {product.stock_quantity}
          </div>
        </CardContent>
        
        <div className="p-4 pt-0">
          {cartQuantity > 0 ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCartQuantity(product.id, cartQuantity - 1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-semibold min-w-[2rem] text-center text-sm">
                  {cartQuantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateCartQuantity(product.id, cartQuantity + 1)}
                  disabled={cartQuantity >= product.stock_quantity}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <span className="text-sm font-medium text-brand-red">
                ₹{(product.price * cartQuantity).toFixed(0)}
              </span>
            </div>
          ) : (
            <Button
              className="w-full bg-brand-red hover:bg-red-600 text-sm py-2"
              onClick={() => addToCart(product)}
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:bg-white/50"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Props Store</h1>
                <p className="text-gray-600">Find the perfect props for your celebration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-brand-red hover:bg-red-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>Cart</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for balloons, decorations, props..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-12 text-base"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <div className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Truck className="h-4 w-4 text-green-500" />
              <span>Free Delivery Above ₹999</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <RotateCcw className="h-4 w-4 text-purple-500" />
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Same Day Setup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Categories */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.name ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            {/* Mobile Category Filter */}
            <div className="lg:hidden mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">
                  {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
                </p>
                {selectedCategory !== 'all' && (
                  <Badge variant="outline" className="text-sm">
                    {selectedCategory}
                  </Badge>
                )}
              </div>
            </div>

            {productsLoading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className={`bg-gray-200 rounded-t-lg ${
                      viewMode === 'grid' ? 'aspect-square' : 'h-32'
                    }`}></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {/* Products Grid/List */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Empty State */}
                {sortedProducts.length === 0 && !productsLoading && (
                  <div className="text-center py-16">
                    <div className="text-gray-400 mb-6">
                      <Package className="h-20 w-20 mx-auto mb-4" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search terms or browse different categories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                        }}
                      >
                        View All Products
                      </Button>
                      <Button 
                        onClick={() => navigate('/#contact')}
                        className="bg-brand-red hover:bg-red-600"
                      >
                        Request Custom Props
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 4).map((category) => (
              <Card 
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedCategory(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">
                    {category.name.toLowerCase().includes('balloon') && '🎈'}
                    {category.name.toLowerCase().includes('birthday') && '🎂'}
                    {category.name.toLowerCase().includes('wedding') && '💍'}
                    {category.name.toLowerCase().includes('baby') && '🍼'}
                    {!category.name.toLowerCase().match(/(balloon|birthday|wedding|baby)/) && '🎉'}
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Props?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                All our props are made from high-quality materials that are safe, durable, and photo-ready.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery available in Bangalore. We ensure your props reach you on time.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Setup Support</h3>
              <p className="text-gray-600">
                Need help setting up? Our team provides guidance and setup assistance for your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        totalPrice={getTotalPrice()}
      />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919035106677?text=Hi%20MY%20Balloons%20MY%20Prop's!%20I'm%20interested%20in%20your%20props%20store."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-40 group"
        title="Chat with us on WhatsApp"
      >
        <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
      </a>

      <Footer />
    </div>
  );
};

export default PropsStore;