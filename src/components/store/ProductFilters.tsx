import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Filter, X, Star } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
  rating: number;
}

interface ProductFiltersProps {
  categories: Array<{ id: string; name: string }>;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  maxPrice: number;
}

const ProductFilters = ({ 
  categories, 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  maxPrice 
}: ProductFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleCategory = (categoryName: string) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter(c => c !== categoryName)
      : [...filters.categories, categoryName];
    updateFilter('categories', newCategories);
  };

  const hasActiveFilters = 
    filters.categories.length > 0 || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < maxPrice ||
    filters.inStock ||
    filters.onSale ||
    filters.rating > 0;

  return (
    <Card className="sticky top-32">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-brand-red hover:text-red-600"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1 mt-2">
            {filters.categories.map(category => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
                <button
                  onClick={() => toggleCategory(category)}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categories.includes(category.name)}
                  onCheckedChange={() => toggleCategory(category.name)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-3">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              max={maxPrice}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="font-medium mb-3">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilter('inStock', checked)}
              />
              <label htmlFor="in-stock" className="text-sm cursor-pointer">
                In Stock Only
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => updateFilter('onSale', checked)}
              />
              <label htmlFor="on-sale" className="text-sm cursor-pointer">
                On Sale
              </label>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium mb-3">Minimum Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors ${
                  filters.rating === rating ? 'bg-brand-red text-white' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">& up</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;