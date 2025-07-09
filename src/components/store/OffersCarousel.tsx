import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LimitedOffer {
  id: string;
  title: string;
  description: string;
  discount_percentage: number | null;
  discount_amount: number | null;
  min_order_amount: number;
  expires_at: string;
}

const OffersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: offers = [] } = useQuery({
    queryKey: ['limited-offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('limited_offers')
        .select('*')
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as LimitedOffer[];
    },
  });

  useEffect(() => {
    if (offers.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [offers.length]);

  const nextOffer = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevOffer = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h left`;
    }
    
    return `${hours}h ${minutes}m left`;
  };

  if (!offers.length) return null;

  const currentOffer = offers[currentIndex];

  return (
    <div className="bg-gradient-to-r from-brand-red to-brand-yellow p-1 rounded-xl shadow-lg mb-6">
      <Card className="relative overflow-hidden bg-white border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-5 w-5 text-brand-red flex-shrink-0" />
                <h3 className="font-bold text-lg text-gray-900 truncate">
                  {currentOffer.title}
                </h3>
              </div>
              
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {currentOffer.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                {currentOffer.discount_percentage && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {currentOffer.discount_percentage}% OFF
                  </Badge>
                )}
                
                {currentOffer.min_order_amount > 0 && (
                  <Badge variant="outline" className="text-xs">
                    Min ₹{currentOffer.min_order_amount}
                  </Badge>
                )}
                
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <Clock className="h-3 w-3" />
                  <span className="font-medium">
                    {getTimeRemaining(currentOffer.expires_at)}
                  </span>
                </div>
              </div>
            </div>

            {offers.length > 1 && (
              <div className="flex flex-col gap-1 ml-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevOffer}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextOffer}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {offers.length > 1 && (
            <div className="flex justify-center gap-1 mt-3">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-brand-red' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OffersCarousel;