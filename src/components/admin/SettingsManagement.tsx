import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Mail, Phone, MapPin, CreditCard, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const SettingsManagement = () => {
  const [businessSettings, setBusinessSettings] = useState({
    business_name: 'MY Balloons MY Props',
    email: 'myballoonsjayanagar@gmail.com',
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    address: 'Jayanagar, Bangalore, Karnataka',
    logo_url: '',
    tagline: 'Celebrate Every Moment with Us',
    working_hours: 'Mon-Sun: 9:00 AM - 8:00 PM'
  });

  const [paymentSettings, setPaymentSettings] = useState({
    razorpay_key_id: '',
    razorpay_key_secret: '',
    enable_cod: true,
    enable_online_payment: true,
    delivery_charges: '50',
    free_delivery_threshold: '1000'
  });

  const [emailSettings, setEmailSettings] = useState({
    smtp_host: '',
    smtp_port: '587',
    smtp_username: '',
    smtp_password: '',
    from_email: 'myballoonsjayanagar@gmail.com',
    from_name: 'MY Balloons MY Props'
  });

  const [websiteSettings, setWebsiteSettings] = useState({
    enable_whatsapp_chat: true,
    enable_contact_form: true,
    enable_gallery: true,
    maintenance_mode: false,
    google_analytics_id: '',
    facebook_pixel_id: ''
  });

  const handleBusinessSettingChange = (field: string, value: string) => {
    setBusinessSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentSettingChange = (field: string, value: string | boolean) => {
    setPaymentSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailSettingChange = (field: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleWebsiteSettingChange = (field: string, value: boolean) => {
    setWebsiteSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveBusinessSettings = async () => {
    try {
      // In real app, save to database/config
      toast.success('Business settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save business settings');
    }
  };

  const savePaymentSettings = async () => {
    try {
      // In real app, save to database/config
      toast.success('Payment settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save payment settings');
    }
  };

  const saveEmailSettings = async () => {
    try {
      // In real app, save to database/config
      toast.success('Email settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save email settings');
    }
  };

  const saveWebsiteSettings = async () => {
    try {
      // In real app, save to database/config
      toast.success('Website settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save website settings');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Settings Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
          </TabsList>

          {/* Business Settings */}
          <TabsContent value="business" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="business_name">Business Name</Label>
                  <Input
                    id="business_name"
                    value={businessSettings.business_name}
                    onChange={(e) => handleBusinessSettingChange('business_name', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) => handleBusinessSettingChange('email', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={businessSettings.phone}
                    onChange={(e) => handleBusinessSettingChange('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={businessSettings.whatsapp}
                    onChange={(e) => handleBusinessSettingChange('whatsapp', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tagline">Business Tagline</Label>
                  <Input
                    id="tagline"
                    value={businessSettings.tagline}
                    onChange={(e) => handleBusinessSettingChange('tagline', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={businessSettings.address}
                    onChange={(e) => handleBusinessSettingChange('address', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="working_hours">Working Hours</Label>
                  <Input
                    id="working_hours"
                    value={businessSettings.working_hours}
                    onChange={(e) => handleBusinessSettingChange('working_hours', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    value={businessSettings.logo_url}
                    onChange={(e) => handleBusinessSettingChange('logo_url', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={saveBusinessSettings} className="bg-brand-red hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Save Business Settings
            </Button>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Razorpay Configuration</h3>
                
                <div>
                  <Label htmlFor="razorpay_key_id">Razorpay Key ID</Label>
                  <Input
                    id="razorpay_key_id"
                    value={paymentSettings.razorpay_key_id}
                    onChange={(e) => handlePaymentSettingChange('razorpay_key_id', e.target.value)}
                    placeholder="rzp_test_xxxxxxxxxx"
                  />
                </div>
                
                <div>
                  <Label htmlFor="razorpay_key_secret">Razorpay Key Secret</Label>
                  <Input
                    id="razorpay_key_secret"
                    type="password"
                    value={paymentSettings.razorpay_key_secret}
                    onChange={(e) => handlePaymentSettingChange('razorpay_key_secret', e.target.value)}
                    placeholder="xxxxxxxxxx"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Options</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable_cod"
                    checked={paymentSettings.enable_cod}
                    onCheckedChange={(value) => handlePaymentSettingChange('enable_cod', value)}
                  />
                  <Label htmlFor="enable_cod">Enable Cash on Delivery</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable_online_payment"
                    checked={paymentSettings.enable_online_payment}
                    onCheckedChange={(value) => handlePaymentSettingChange('enable_online_payment', value)}
                  />
                  <Label htmlFor="enable_online_payment">Enable Online Payment</Label>
                </div>
                
                <div>
                  <Label htmlFor="delivery_charges">Delivery Charges (₹)</Label>
                  <Input
                    id="delivery_charges"
                    type="number"
                    value={paymentSettings.delivery_charges}
                    onChange={(e) => handlePaymentSettingChange('delivery_charges', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="free_delivery_threshold">Free Delivery Threshold (₹)</Label>
                  <Input
                    id="free_delivery_threshold"
                    type="number"
                    value={paymentSettings.free_delivery_threshold}
                    onChange={(e) => handlePaymentSettingChange('free_delivery_threshold', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={savePaymentSettings} className="bg-brand-red hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Save Payment Settings
            </Button>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">SMTP Configuration</h3>
                
                <div>
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    value={emailSettings.smtp_host}
                    onChange={(e) => handleEmailSettingChange('smtp_host', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    value={emailSettings.smtp_port}
                    onChange={(e) => handleEmailSettingChange('smtp_port', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="smtp_username">SMTP Username</Label>
                  <Input
                    id="smtp_username"
                    value={emailSettings.smtp_username}
                    onChange={(e) => handleEmailSettingChange('smtp_username', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="smtp_password">SMTP Password</Label>
                  <Input
                    id="smtp_password"
                    type="password"
                    value={emailSettings.smtp_password}
                    onChange={(e) => handleEmailSettingChange('smtp_password', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Email Settings</h3>
                
                <div>
                  <Label htmlFor="from_email">From Email</Label>
                  <Input
                    id="from_email"
                    type="email"
                    value={emailSettings.from_email}
                    onChange={(e) => handleEmailSettingChange('from_email', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="from_name">From Name</Label>
                  <Input
                    id="from_name"
                    value={emailSettings.from_name}
                    onChange={(e) => handleEmailSettingChange('from_name', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={saveEmailSettings} className="bg-brand-red hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Save Email Settings
            </Button>
          </TabsContent>

          {/* Website Settings */}
          <TabsContent value="website" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Website Features</h3>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable_whatsapp_chat"
                    checked={websiteSettings.enable_whatsapp_chat}
                    onCheckedChange={(value) => handleWebsiteSettingChange('enable_whatsapp_chat', value)}
                  />
                  <Label htmlFor="enable_whatsapp_chat">Enable WhatsApp Chat Button</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable_contact_form"
                    checked={websiteSettings.enable_contact_form}
                    onCheckedChange={(value) => handleWebsiteSettingChange('enable_contact_form', value)}
                  />
                  <Label htmlFor="enable_contact_form">Enable Contact Form</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enable_gallery"
                    checked={websiteSettings.enable_gallery}
                    onCheckedChange={(value) => handleWebsiteSettingChange('enable_gallery', value)}
                  />
                  <Label htmlFor="enable_gallery">Enable Gallery Section</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="maintenance_mode"
                    checked={websiteSettings.maintenance_mode}
                    onCheckedChange={(value) => handleWebsiteSettingChange('maintenance_mode', value)}
                  />
                  <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Analytics & Tracking</h3>
                
                <div>
                  <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                  <Input
                    id="google_analytics_id"
                    value={websiteSettings.google_analytics_id}
                    onChange={(e) => setWebsiteSettings(prev => ({ ...prev, google_analytics_id: e.target.value }))}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                
                <div>
                  <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                  <Input
                    id="facebook_pixel_id"
                    value={websiteSettings.facebook_pixel_id}
                    onChange={(e) => setWebsiteSettings(prev => ({ ...prev, facebook_pixel_id: e.target.value }))}
                    placeholder="123456789012345"
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={saveWebsiteSettings} className="bg-brand-red hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Save Website Settings
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsManagement;