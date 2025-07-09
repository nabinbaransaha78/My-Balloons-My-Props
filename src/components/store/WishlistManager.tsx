import { useState, useEffect } from 'react';
import { Heart, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories: { name: string };
}

interface WishlistManagerProps {
  product?: Product;
  onAddToCart?: (product: Product) => void;
  showWishlistView?: boolean;
}

const WishlistManager = ({ product, onAddToCart, showWishlistView = false }: WishlistManagerProps) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('props-wishlist');
    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist);
      setWishlist(parsedWishlist);
      
      if (product) {
        setIsInWishlist(parsedWishlist.some((item: Product) => item.id === product.id));
      }
    }
  }, [product]);

  const saveWishlist = (newWishlist: Product[]) => {
    localStorage.setItem('props-wishlist', JSON.stringify(newWishlist));
    setWishlist(newWishlist);
  };

  const toggleWishlist = () => {
    if (!product) return;

    let newWishlist;
    if (isInWishlist) {
      newWishlist = wishlist.filter(item => item.id !== product.id);
      toast.success('Removed from wishlist');
    } else {
      newWishlist = [...wishlist, product];
      toast.success('Added to wishlist ❤️');
    }
    
    saveWishlist(newWishlist);
    setIsInWishlist(!isInWishlist);
  };

  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist(newWishlist);
    toast.success('Removed from wishlist');
  };

  const moveToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
      removeFromWishlist(product.id);
    }
  };

  // Heart button for product cards
  if (!showWishlistView && product) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleWishlist}
        className={`absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white ${
          isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
      >
        <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
      </Button>
    );
  }

  // Wishlist view component
  if (showWishlistView) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            My Wishlist
            {wishlist.length > 0 && (
              <Badge variant="secondary">{wishlist.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {wishlist.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Your wishlist is empty</p>
              <p className="text-sm">Save items you love for later!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <span className="text-brand-red font-bold">₹{item.price}</span>
                    {item.stock_quantity < 5 && item.stock_quantity > 0 && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Only {item.stock_quantity} left
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => moveToCart(item)}
                      disabled={item.stock_quantity === 0}
                      className="bg-brand-blue hover:bg-blue-600 text-white h-8 px-3 text-xs"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      {item.stock_quantity === 0 ? 'Out of Stock' : 'Move to Cart'}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {onAddToCart && (
                <Button
                  className="w-full bg-brand-red hover:bg-red-600 text-white mt-4"
                  onClick={() => {
                    wishlist.forEach(item => {
                      if (item.stock_quantity > 0) {
                        moveToCart(item);
                      }
                    });
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All Available to Cart
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default WishlistManager;