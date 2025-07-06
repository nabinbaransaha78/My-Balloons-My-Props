
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mail, Phone, MapPin, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  location: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const ContactManagement = () => {
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContactForm[];
    },
  });

  const markAsRead = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('contact_forms')
        .update({ is_read: true })
        .eq('id', contactId);
      
      if (error) throw error;
      
      toast.success('Message marked as read!');
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Contact Messages</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse p-4 border rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className={`${!contact.is_read ? 'border-l-4 border-l-brand-red bg-red-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      {!contact.is_read && (
                        <Badge className="bg-red-100 text-red-800">New</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{contact.phone}</span>
                        </div>
                      )}
                      {contact.event_type && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{contact.event_type}</span>
                        </div>
                      )}
                      {contact.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{contact.location}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Message</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {contact.message || 'No message provided'}
                      </p>
                    </div>
                  </div>

                  {!contact.is_read && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        onClick={() => markAsRead(contact.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {contacts.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No contact messages found.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactManagement;
