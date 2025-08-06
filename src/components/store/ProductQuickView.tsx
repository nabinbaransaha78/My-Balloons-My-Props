import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, Plus, Minus, Heart, Share2, Eye, 
  Star, Truck, Shield, RotateCcw, Zap 
} from 'lucide-react';
import { toast } from 'sonner';
import WishlistManager from './WishlistManager';
import ProductReviews from './ProductReviews';
import FrequentlyBoughtTogether from './FrequentlyBoughtTogether';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories: { name: string };
}

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  cartQuantity: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const ProductQuickView = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  cartQuantity, 
  onUpdateQuantity 
}: ProductQuickViewProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');

  if (!product) return null;

  const productImages = [
    product.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    // Add more images if available
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const features = [
    { icon: Truck, text: 'Free delivery above ₹999' },
    { icon: Shield, text: 'Quality guaranteed' },
    { icon: RotateCcw, text: 'Easy returns' },
    { icon: Zap, text: 'Same day setup available' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
        <div className="grid md:grid-cols-2 h-full">
          {/* Product Images */}
          <div className="relative bg-gray-50">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="bg-white/80 hover:bg-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <WishlistManager product={product} onAddToCart={onAddToCart} />
              </div>
            </div>
            
            {productImages.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-brand-red' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col h-full">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {product.categories && (
                    <Badge className="mb-2 bg-brand-blue text-white">
                      {product.categories.name}
                    </Badge>
                  )}
                  <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(4.8) • 24 reviews</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-6">
                {/* Price and Stock */}
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-3xl font-bold text-brand-red">₹{product.price}</span>
                    {product.stock_quantity < 5 && product.stock_quantity > 0 && (
                      <Badge className="bg-orange-100 text-orange-800">
                        Only {product.stock_quantity} left
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600">Inclusive of all taxes</p>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'Perfect for your celebration! High-quality prop that will make your event memorable.'}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3">What's Included</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <feature.icon className="h-4 w-4 text-brand-blue" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Add to Cart Section */}
                <div className="space-y-4">
                  {cartQuantity > 0 ? (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(product.id, cartQuantity - 1)}
                          className="h-10 w-10 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold text-lg min-w-[3rem] text-center">
                          {cartQuantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(product.id, cartQuantity + 1)}
                          disabled={cartQuantity >= product.stock_quantity}
                          className="h-10 w-10 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-xl font-bold text-brand-red">
                          ₹{(product.price * cartQuantity).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-brand-red hover:bg-red-600 h-12 text-lg"
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12">
                      <Heart className="h-4 w-4 mr-2" />
                      Save for Later
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-12"
                      onClick={() => window.open(`https://wa.me/919035106677?text=Hi! I'm interested in ${product.name}`, '_blank')}
                    >
                      Ask Questions
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section with Tabs */}
            <div className="border-t bg-gray-50 p-6">
              <div className="flex gap-4 mb-4">
                <Button
                  variant={activeTab === 'details' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </Button>
                <Button
                  variant={activeTab === 'reviews' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </Button>
                <Button
                  variant={activeTab === 'bundles' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('bundles')}
                >
                  Bundle Deals
                </Button>
              </div>
<div className="max-h-40 overflow-y-auto">
  {activeTab === 'details' && (
    <div className="space-y-2 text-sm">
      <p><strong>Material:</strong> Premium quality materials</p>
      <p><strong>Dimensions:</strong> Standard party size</p>
      <p><strong>Care Instructions:</strong> Handle with care, store in dry place</p>
      <p><strong>Suitable for:</strong> Indoor and outdoor events</p>
    </div>
  )}
  
  {activeTab === 'reviews' && (
    <ProductReviews product={product} />
  )}
  
  {activeTab === 'bundles' && (
    <FrequentlyBoughtTogether store={product} />
  )}
</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
