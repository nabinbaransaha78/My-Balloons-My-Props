import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Image, Plus, Trash2, Upload, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string;
  order_index: number;
  is_featured: boolean;
  created_at: string;
}

const GalleryManagement = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: 'birthday',
    is_featured: false
  });

  // Sample gallery data - in real app, fetch from database
  const { data: galleryImages = [], isLoading } = useQuery({
    queryKey: ['gallery-images'],
    queryFn: async () => {
      return [
        {
          id: '1',
          title: 'Birthday Party Setup',
          image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
          category: 'birthday',
          order_index: 1,
          is_featured: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Wedding Decoration',
          image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
          category: 'wedding',
          order_index: 2,
          is_featured: false,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Baby Shower Theme',
          image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
          category: 'baby_shower',
          order_index: 3,
          is_featured: true,
          created_at: new Date().toISOString()
        }
      ] as GalleryImage[];
    },
  });

  const categories = [
    { value: 'birthday', label: 'Birthday Parties' },
    { value: 'wedding', label: 'Weddings' },
    { value: 'baby_shower', label: 'Baby Showers' },
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'anniversary', label: 'Anniversaries' },
    { value: 'other', label: 'Other Events' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.image_url) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      // In real app, save to database
      toast.success('Image added to gallery successfully!');
      setIsDialogOpen(false);
      setFormData({ title: '', image_url: '', category: 'birthday', is_featured: false });
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
    } catch (error) {
      console.error('Error adding image:', error);
      toast.error('Failed to add image');
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      // In real app, delete from database
      toast.success('Image deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const toggleFeatured = async (imageId: string, currentStatus: boolean) => {
    try {
      // In real app, update database
      toast.success(`Image ${currentStatus ? 'removed from' : 'added to'} featured!`);
      queryClient.invalidateQueries({ queryKey: ['gallery-images'] });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast.error('Failed to update featured status');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Image className="h-5 w-5" />
            <span>Gallery Management</span>
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-red hover:bg-red-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Gallery Image</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Image Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter image title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image_url">Image URL *</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                  />
                  <Label htmlFor="is_featured">Featured Image</Label>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1 bg-brand-red hover:bg-red-600">
                    Add Image
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setPreviewImage(image.image_url)}
                  />
                  {image.is_featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 bg-white"
                      onClick={() => setPreviewImage(image.image_url)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm mb-1">{image.title}</h4>
                  <p className="text-xs text-gray-600 capitalize mb-2">
                    {image.category.replace('_', ' ')}
                  </p>
                  <Button
                    size="sm"
                    variant={image.is_featured ? "destructive" : "outline"}
                    className="w-full text-xs"
                    onClick={() => toggleFeatured(image.id, image.is_featured)}
                  >
                    {image.is_featured ? 'Remove Featured' : 'Make Featured'}
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {galleryImages.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Image className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No images in gallery. Add your first image!</p>
              </div>
            )}
          </div>
        )}

        {/* Image Preview Dialog */}
        {previewImage && (
          <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Image Preview</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryManagement;