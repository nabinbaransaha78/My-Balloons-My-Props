import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  ShoppingCart, ArrowLeft, Search, X, Heart, 
  Grid3X3, List, SlidersHorizontal, Package,
  Truck, Shield, RotateCcw, Zap, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartModal from '@/components/CartModal';
import OffersCarousel from '@/components/store/OffersCarousel';
import ProductRecommendations from '@/components/store/ProductRecommendations';
import WishlistManager from '@/components/store/WishlistManager';
import WhatsAppSupport from '@/components/store/WhatsAppSupport';
import ProductCard from '@/components/store/ProductCard';
import ProductQuickView from '@/components/store/ProductQuickView';
import ProductFilters from '@/components/store/ProductFilters';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories: { name: string };
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 5000] as [number, number],
    inStock: false,
    onSale: false,
    rating: 0
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
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
  // Ensure product and its properties are valid before processing
  if (!product || typeof product.name !== 'string' || typeof product.price !== 'number') {
    return false;
  }

  const matchesCategory = selectedCategory === 'all' ||
    product.categories?.name === selectedCategory ||
    filters.categories.length === 0 ||
    filters.categories.includes(product.categories?.name || '');

  const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());

  const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
  const matchesStock = !filters.inStock || product.stock_quantity > 0;

  return matchesCategory && matchesSearch && matchesPrice && matchesStock;
});

  const sortedProducts = [...filteredProducts].sort((a, b) => {
  switch (sortBy) {
    case 'price-low':
      return (a.price || 0) - (b.price || 0);
    case 'price-high':
      return (b.price || 0) - (a.price || 0);
    case 'name':
      return (a.name || '').localeCompare(b.name || '');
    case 'newest':
      // Added a check for `created_at` which was missing from the Product interface
      // This prevents potential errors if the property doesn't exist
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
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
  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFilters({
      categories: [],
      priceRange: [0, maxPrice],
      inStock: false,
      onSale: false,
      rating: 0
    });
    setSortBy('name');
  };

  const maxPrice = Math.max(...products.map(p => p.price), 5000);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
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
                variant="outline"
                onClick={() => setShowWishlist(!showWishlist)}
                className="relative hidden sm:flex"
              >
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              
              <Button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-brand-red hover:bg-red-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Cart</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
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
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="hidden lg:flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              
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
              
              {/* Mobile Filter Sheet */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                    <SheetDescription>
                      Refine your search to find the perfect props
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Categories</h4>
                      <div className="space-y-2">
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
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <div className="space-y-3">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={maxPrice}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={clearFilters} variant="outline" className="w-full">
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Carousel */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <OffersCarousel />
      </div>

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
        {showWishlist ? (
          <div className="mb-8">
            <WishlistManager 
              showWishlistView={true} 
              onAddToCart={(product) => {
                addToCart(product);
                setShowWishlist(false);
                setTimeout(() => setShowWishlist(true), 100);
              }} 
            />
          </div>
        ) : (
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <div className={`hidden lg:block transition-all duration-300 ${showFilters ? 'w-80' : 'w-0 overflow-hidden'}`}>
              {showFilters && (
                <ProductFilters
                  categories={categories}
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearAllFilters}
                  maxPrice={maxPrice}
                />
              )}
            </div>

            {/* Products Section */}
            <div className="flex-1 min-w-0">
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
                  {(searchQuery || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-brand-red hover:text-red-600"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="hidden lg:flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
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
                    {sortedProducts.map((product) => {
                      const cartItem = cart.find(item => item.id === product.id);
                      const cartQuantity = cartItem?.quantity || 0;
                      
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          viewMode={viewMode}
                          cartQuantity={cartQuantity}
                          onAddToCart={addToCart}
                          onUpdateQuantity={updateCartQuantity}
                          onQuickView={setQuickViewProduct}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Empty State */}
                  {sortedProducts.length === 0 && !productsLoading && (
                    <div className="text-center py-16">
                      <div className="text-gray-400 mb-6">
                        <Package className="h-20 w-20 mx-auto mb-4" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-500 mb-6">
                        Try adjusting your search terms or filters to find what you're looking for.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button 
                          variant="outline" 
                          onClick={clearAllFilters}
                        >
                          Clear All Filters
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

                  {/* Load More Button (for pagination) */}
                  {sortedProducts.length > 0 && sortedProducts.length >= 20 && (
                    <div className="text-center mt-12">
                      <Button variant="outline" className="px-8">
                        Load More Products
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Recommendations Section */}
              {sortedProducts.length > 0 && selectedCategory !== 'all' && (
                <div className="mt-12">
                  <ProductRecommendations
                    categoryName={selectedCategory}
                    onAddToCart={addToCart}
                    title={`More from ${selectedCategory}`}
                  />
                </div>
              )}
            </div>
          </div>
        )}
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
                onClick={() => {
                  setSelectedCategory(category.name);
                  setShowWishlist(false);
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">
                    {category.name === 'Balloons' && '🎈'}
                    {category.name === 'Birthday Kits' && '🎂'}
                    {category.name === 'Wedding Decor' && '💍'}
                    {category.name === 'Baby Shower' && '🍼'}
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

      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        cartQuantity={cart.find(item => item.id === quickViewProduct?.id)?.quantity || 0}
        onUpdateQuantity={updateCartQuantity}
      />

      <WhatsAppSupport />
      <Footer />
    </div>
  );
};

export default PropsStore;
