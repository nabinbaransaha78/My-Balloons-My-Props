import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ShoppingCart, Heart } from 'lucide-react';
import WishlistManager from './WishlistManager';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  categories: { name: string } | null;
}

interface ProductRecommendationsProps {
  currentProductId?: string;
  categoryName?: string;
  onAddToCart: (product: Product) => void;
  title?: string;
}

const ProductRecommendations = ({ 
  currentProductId, 
  categoryName, 
  onAddToCart,
  title = "You Might Also Like"
}: ProductRecommendationsProps) => {
  const { data: recommendations = [] } = useQuery({
    queryKey: ['recommendations', currentProductId, categoryName],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('is_active', true)
        .gt('stock_quantity', 0);

      // Exclude current product if provided
      if (currentProductId) {
        query = query.neq('id', currentProductId);
      }

      // Filter by category if provided
      if (categoryName) {
        // First get the category ID
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', categoryName)
          .single();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Product[];
    },
  });

  if (!recommendations.length) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-brand-yellow" />
          {title}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {categoryName 
            ? `More products from ${categoryName} category` 
            : 'Discover more amazing props for your celebration'
          }
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((product) => (
            <div key={product.id} className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
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
                
                {product.stock_quantity < 5 && (
                  <Badge className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs">
                    Only {product.stock_quantity} left
                  </Badge>
                )}
              </div>
              
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2 leading-tight">
                  {product.name}
                </h4>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-brand-red">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-gray-500">
                    Stock: {product.stock_quantity}
                  </span>
                </div>
                
                <Button
                  className="w-full bg-brand-red hover:bg-red-600 text-white text-sm py-2"
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-3 w-3 mr-2" />
                  {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {recommendations.length >= 6 && (
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              View More Products
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductRecommendations;