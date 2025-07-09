import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, StarIcon, MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    review: ''
  });

  const queryClient = useQueryClient();

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    },
  });

  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          product_id: productId,
          customer_name: reviewData.name,
          customer_email: reviewData.email,
          rating: reviewData.rating,
          review_text: reviewData.review
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Review submitted! It will be visible after approval.');
      setFormData({ name: '', email: '', rating: 5, review: '' });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: () => {
      toast.error('Failed to submit review. Please try again.');
    }
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`h-4 w-4 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    submitReviewMutation.mutate(formData);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5" />
            Reviews & Ratings
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="text-brand-blue hover:bg-brand-blue hover:text-white"
          >
            Write Review
          </Button>
        </div>
        
        {reviews.length > 0 && (
          <div className="flex items-center gap-3 mt-2">
            {renderStars(averageRating)}
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)} out of 5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4">
            <h4 className="font-semibold text-gray-900">Write a Review for {productName}</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              {renderStars(formData.rating, true, (rating) => 
                setFormData({ ...formData, rating })
              )}
            </div>

            <Textarea
              placeholder="Share your experience with this product..."
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              rows={3}
            />

            <div className="flex gap-2">
              <Button 
                type="submit" 
                disabled={submitReviewMutation.isPending}
                className="bg-brand-blue hover:bg-blue-600"
              >
                {submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 rounded-full p-2">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{review.customer_name}</span>
                      <Badge variant="outline" className="text-xs">
                        Verified
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {review.review_text && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {review.review_text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReviews;