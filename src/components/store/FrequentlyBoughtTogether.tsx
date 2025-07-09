import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories: { name: string };
}

interface FrequentlyBoughtTogetherProps {
  productId: string;
  onAddToCart: (product: Product) => void;
}

const FrequentlyBoughtTogether = ({ productId, onAddToCart }: FrequentlyBoughtTogetherProps) => {
  const { data: bundleProducts = [] } = useQuery({
    queryKey: ['product-bundles', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_bundles')
        .select(`
          suggested_product_id,
          products!product_bundles_suggested_product_id_fkey (
            id,
            name,
            price,
            image_url,
            stock_quantity
          )
        `)
        .eq('main_product_id', productId)
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data.map(item => item.products).filter(Boolean) as Product[];
    },
  });

  if (!bundleProducts.length) return null;

  const totalPrice = bundleProducts.reduce((sum, product) => sum + product.price, 0);
  const averageDiscount = 10; // 10% bundle discount

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="h-5 w-5 text-brand-blue" />
          Frequently Bought Together
        </CardTitle>
        <p className="text-sm text-gray-600">
          Customers who bought this item also bought these products
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bundleProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-red font-bold">₹{product.price}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="h-8 px-3 text-xs"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Buy all together and save!
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-green-600">
                    ₹{Math.round(totalPrice * (1 - averageDiscount / 100))}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{totalPrice}
                  </span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Save {averageDiscount}%
                  </Badge>
                </div>
              </div>
            </div>
            
            <Button
              className="w-full bg-brand-blue hover:bg-blue-600 text-white"
              onClick={() => {
                bundleProducts.forEach(product => onAddToCart(product));
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FrequentlyBoughtTogether;