import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { FileText, Save, Image, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface WebsiteContent {
  id: string;
  section: string;
  title: string;
  content: string;
  image_url?: string;
  order_index?: number;
}

const ContentManagement = () => {
  const queryClient = useQueryClient();
  const [editingContent, setEditingContent] = useState<WebsiteContent | null>(null);
  const [formData, setFormData] = useState({
    section: '',
    title: '',
    content: '',
    image_url: ''
  });

  const { data: contents = [], isLoading } = useQuery({
    queryKey: ['website-content'],
    queryFn: async () => {
      // Since we don't have a website_content table, we'll simulate with local state
      // In a real app, you'd fetch from the database
      return [
        {
          id: '1',
          section: 'hero',
          title: 'Celebrate Every Moment with Us',
          content: 'Transform your special occasions into magical memories with our premium balloon decorations and event services.',
          image_url: '',
          order_index: 1
        },
        {
          id: '2',
          section: 'about',
          title: 'About MY Balloons MY Props',
          content: 'We are passionate about creating memorable experiences for your special occasions. With years of expertise in event decoration and props rental, we bring your vision to life.',
          image_url: '',
          order_index: 2
        },
        {
          id: '3',
          section: 'services',
          title: 'Our Services',
          content: 'Birthday Parties, Weddings, Baby Showers, Corporate Events - we handle all types of celebrations with creativity and professionalism.',
          image_url: '',
          order_index: 3
        }
      ] as WebsiteContent[];
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = (content: WebsiteContent) => {
    setEditingContent(content);
    setFormData({
      section: content.section,
      title: content.title,
      content: content.content,
      image_url: content.image_url || ''
    });
  };

  const handleSave = async () => {
    try {
      // In a real app, you'd save to database
      toast.success('Content updated successfully!');
      setEditingContent(null);
      setFormData({ section: '', title: '', content: '', image_url: '' });
      queryClient.invalidateQueries({ queryKey: ['website-content'] });
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Website Content Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="edit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit Content</TabsTrigger>
            <TabsTrigger value="meta">SEO & Meta</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Content List */}
              <div>
                <h3 className="font-semibold mb-4">Website Sections</h3>
                <div className="space-y-2">
                  {contents.map((content) => (
                    <Card key={content.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleEdit(content)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium capitalize">{content.section}</h4>
                            <p className="text-sm text-gray-600 truncate">{content.title}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <h3 className="font-semibold mb-4">
                  {editingContent ? `Edit ${editingContent.section}` : 'Select a section to edit'}
                </h3>
                {editingContent && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Section Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter section title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="Enter section content"
                        rows={6}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="image_url">Image URL (Optional)</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => handleInputChange('image_url', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <Button onClick={handleSave} className="w-full bg-brand-red hover:bg-red-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meta" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">SEO Settings</h3>
              
              <div>
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  defaultValue="MY Balloons MY Props - Event Decoration & Props Rental"
                  placeholder="Site title for SEO"
                />
              </div>
              
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  defaultValue="Professional balloon decorations and event props rental services. Transform your celebrations with our creative designs and quality props."
                  placeholder="Meta description for search engines"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="meta_keywords">Keywords</Label>
                <Input
                  id="meta_keywords"
                  defaultValue="balloon decoration, event props, party supplies, birthday decoration, wedding decoration"
                  placeholder="SEO keywords separated by commas"
                />
              </div>
              
              <Button className="bg-brand-red hover:bg-red-600">
                <Save className="h-4 w-4 mr-2" />
                Update SEO Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentManagement;