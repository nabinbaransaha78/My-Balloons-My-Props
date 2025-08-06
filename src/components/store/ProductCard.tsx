import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Plus, Minus, Eye, Star, Share2,
  Truck, Clock, Heart
} from 'lucide-react';
import WishlistManager from './WishlistManager';
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

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({ 
  product, 
  viewMode, 
  cartQuantity, 
  onAddToCart, 
  onUpdateQuantity, 
  onQuickView 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied!');
    }
  };

  const getDeliveryInfo = () => {
    if (product.price >= 999) {
      return { icon: Truck, text: 'Free Delivery', color: 'text-green-600' };
    }
    return { icon: Clock, text: 'Same Day', color: 'text-blue-600' };
  };

  const deliveryInfo = getDeliveryInfo();

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="flex">
          <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
            <img
              src={product.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            <WishlistManager product={product} onAddToCart={onAddToCart} />
            
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
          </div>
          
          <div className="flex-1 flex flex-col">
            <CardContent className="flex-1 p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(4.8)</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-brand-red">₹{product.price}</span>
                    <div className={`flex items-center gap-1 text-sm ${deliveryInfo.color}`}>
                      <deliveryInfo.icon className="h-4 w-4" />
                      <span>{deliveryInfo.text}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onQuickView(product)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="h-8 w-8 p-0"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-6 pt-0">
              {cartQuantity > 0 ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-semibold min-w-[2rem] text-center">
                      {cartQuantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
                      disabled={cartQuantity >= product.stock_quantity}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-lg font-medium text-brand-red">
                    ₹{(product.price * cartQuantity).toFixed(0)}
                  </span>
                </div>
              ) : (
                <Button
                  className="w-full bg-brand-red hover:bg-red-600"
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              )}
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <WishlistManager product={product} onAddToCart={onAddToCart} />
        
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
        
        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <Eye className="h-4 w-4 mr-1" />
            Quick View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
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
          <div className={`flex items-center gap-1 text-xs ${deliveryInfo.color}`}>
            <deliveryInfo.icon className="h-3 w-3" />
            <span>{deliveryInfo.text}</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          Stock: {product.stock_quantity}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {cartQuantity > 0 ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateQuantity(product.id, cartQuantity - 1);
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateQuantity(product.id, cartQuantity + 1);
                }}
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
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={product.stock_quantity === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;