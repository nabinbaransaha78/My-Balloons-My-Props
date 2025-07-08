import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Mail, Save, Eye, Send } from 'lucide-react';
import { toast } from 'sonner';

const EmailTemplateManagement = () => {
  const [orderConfirmationTemplate, setOrderConfirmationTemplate] = useState({
    subject: 'Order Confirmation - MY Balloons MY Props',
    html_content: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #dc2626; margin: 0;">MY Balloons MY Props</h1>
      <p style="color: #666; margin: 5px 0;">Celebrate Every Moment with Us</p>
    </div>
    
    <h2 style="color: #333; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Order Confirmation</h2>
    
    <p>Dear {{customer_name}},</p>
    <p>Thank you for your order! We're excited to help make your celebration special.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #333; margin-top: 0;">Order Details</h3>
      <p><strong>Order Number:</strong> {{order_number}}</p>
      <p><strong>Order Date:</strong> {{order_date}}</p>
      <p><strong>Total Amount:</strong> ₹{{total_amount}}</p>
      <p><strong>Payment Method:</strong> {{payment_method}}</p>
    </div>
    
    <div style="margin: 20px 0;">
      <h3 style="color: #333;">Items Ordered</h3>
      {{order_items}}
    </div>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #333; margin-top: 0;">Delivery Information</h3>
      <p><strong>Delivery Address:</strong><br>{{delivery_address}}</p>
    </div>
    
    <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
      <h3 style="margin: 0 0 10px 0;">Need Help?</h3>
      <p style="margin: 0;">Contact us on WhatsApp: <a href="https://wa.me/919876543210" style="color: white; text-decoration: underline;">+91 9876543210</a></p>
      <p style="margin: 5px 0 0 0;">Email: myballoonsjayanagar@gmail.com</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 14px;">Thank you for choosing MY Balloons MY Props!</p>
    </div>
  </div>
</div>
    `,
    variables: ['customer_name', 'order_number', 'order_date', 'total_amount', 'payment_method', 'order_items', 'delivery_address']
  });

  const [contactFormTemplate, setContactFormTemplate] = useState({
    subject: 'Thank you for contacting MY Balloons MY Props',
    html_content: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #dc2626; margin: 0;">MY Balloons MY Props</h1>
      <p style="color: #666; margin: 5px 0;">Celebrate Every Moment with Us</p>
    </div>
    
    <h2 style="color: #333; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Thank You for Your Inquiry!</h2>
    
    <p>Dear {{customer_name}},</p>
    <p>Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #333; margin-top: 0;">Your Message Details</h3>
      <p><strong>Event Type:</strong> {{event_type}}</p>
      <p><strong>Location:</strong> {{location}}</p>
      <p><strong>Message:</strong><br>{{message}}</p>
    </div>
    
    <div style="background-color: #dc2626; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
      <h3 style="margin: 0 0 10px 0;">Get in Touch</h3>
      <p style="margin: 0;">WhatsApp: <a href="https://wa.me/919876543210" style="color: white; text-decoration: underline;">+91 9876543210</a></p>
      <p style="margin: 5px 0 0 0;">Email: myballoonsjayanagar@gmail.com</p>
    </div>
    
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 14px;">We look forward to making your celebration memorable!</p>
    </div>
  </div>
</div>
    `,
    variables: ['customer_name', 'event_type', 'location', 'message']
  });

  const [testEmail, setTestEmail] = useState('');

  const handleOrderTemplateChange = (field: string, value: string) => {
    setOrderConfirmationTemplate(prev => ({ ...prev, [field]: value }));
  };

  const handleContactTemplateChange = (field: string, value: string) => {
    setContactFormTemplate(prev => ({ ...prev, [field]: value }));
  };

  const saveOrderTemplate = async () => {
    try {
      // In real app, save to database
      toast.success('Order confirmation template saved successfully!');
    } catch (error) {
      toast.error('Failed to save template');
    }
  };

  const saveContactTemplate = async () => {
    try {
      // In real app, save to database
      toast.success('Contact form template saved successfully!');
    } catch (error) {
      toast.error('Failed to save template');
    }
  };

  const sendTestEmail = async (templateType: string) => {
    if (!testEmail) {
      toast.error('Please enter a test email address');
      return;
    }

    try {
      // In real app, send test email
      toast.success(`Test ${templateType} email sent to ${testEmail}!`);
    } catch (error) {
      toast.error('Failed to send test email');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Email Template Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="order" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="order">Order Confirmation</TabsTrigger>
            <TabsTrigger value="contact">Contact Form Reply</TabsTrigger>
          </TabsList>

          {/* Order Confirmation Template */}
          <TabsContent value="order" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="order_subject">Email Subject</Label>
                <Input
                  id="order_subject"
                  value={orderConfirmationTemplate.subject}
                  onChange={(e) => handleOrderTemplateChange('subject', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="order_content">Email Content (HTML)</Label>
                <Textarea
                  id="order_content"
                  value={orderConfirmationTemplate.html_content}
                  onChange={(e) => handleOrderTemplateChange('html_content', e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Available Variables:</h4>
                <div className="flex flex-wrap gap-2">
                  {orderConfirmationTemplate.variables.map((variable) => (
                    <span key={variable} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Enter test email address"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => sendTestEmail('order confirmation')}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Test
                </Button>
              </div>
              
              <Button onClick={saveOrderTemplate} className="bg-brand-red hover:bg-red-600">
                <Save className="h-4 w-4 mr-2" />
                Save Order Template
              </Button>
            </div>
          </TabsContent>

          {/* Contact Form Template */}
          <TabsContent value="contact" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact_subject">Email Subject</Label>
                <Input
                  id="contact_subject"
                  value={contactFormTemplate.subject}
                  onChange={(e) => handleContactTemplateChange('subject', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="contact_content">Email Content (HTML)</Label>
                <Textarea
                  id="contact_content"
                  value={contactFormTemplate.html_content}
                  onChange={(e) => handleContactTemplateChange('html_content', e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Available Variables:</h4>
                <div className="flex flex-wrap gap-2">
                  {contactFormTemplate.variables.map((variable) => (
                    <span key={variable} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Enter test email address"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => sendTestEmail('contact form reply')}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Test
                </Button>
              </div>
              
              <Button onClick={saveContactTemplate} className="bg-brand-red hover:bg-red-600">
                <Save className="h-4 w-4 mr-2" />
                Save Contact Template
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailTemplateManagement;