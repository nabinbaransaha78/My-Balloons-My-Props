
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Filter, ArrowLeft } from 'lucide-react';
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
    const matchesCategory = selectedCategory === 'all' || product.categories?.name === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Store Header */}
      <div className="bg-white shadow-sm border-b pt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Props Store</h1>
                <p className="text-gray-600">Find the perfect props for your celebration</p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-brand-red hover:bg-red-600"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium mb-2">Categories</label>
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
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {productsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const cartItem = cart.find(item => item.id === product.id);
                    const cartQuantity = cartItem?.quantity || 0;
                    
                    return (
                      <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={product.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'}
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.categories && (
                            <Badge className="absolute top-2 right-2 bg-brand-blue text-white">
                              {product.categories.name}
                            </Badge>
                          )}
                        </div>
                        
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-2xl font-bold text-brand-red">
                              ₹{product.price}
                            </span>
                            <span className="text-sm text-gray-500">
                              Stock: {product.stock_quantity}
                            </span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-4 pt-0">
                          {cartQuantity > 0 ? (
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCartQuantity(product.id, cartQuantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-semibold min-w-[2rem] text-center">
                                  {cartQuantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCartQuantity(product.id, cartQuantity + 1)}
                                  disabled={cartQuantity >= product.stock_quantity}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <span className="text-sm font-medium">
                                ₹{(product.price * cartQuantity).toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <Button
                              className="w-full bg-brand-red hover:bg-red-600"
                              onClick={() => addToCart(product)}
                              disabled={product.stock_quantity === 0}
                            >
                              {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateCartQuantity}
        totalPrice={getTotalPrice()}
      />

      <Footer />
    </div>
  );
};

export default PropsStore;
