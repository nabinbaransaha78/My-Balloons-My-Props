
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Lock, Package, ShoppingCart, MessageSquare, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ProductManagement from '@/components/admin/ProductManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import ContactManagement from '@/components/admin/ContactManagement';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [productsResult, ordersResult, contactsResult] = await Promise.all([
        supabase.from('products').select('id').eq('is_active', true),
        supabase.from('orders').select('id, status'),
        supabase.from('contact_forms').select('id, is_read').eq('is_read', false)
      ]);

      return {
        totalProducts: productsResult.data?.length || 0,
        totalOrders: ordersResult.data?.length || 0,
        pendingOrders: ordersResult.data?.filter(order => order.status === 'pending').length || 0,
        unreadContacts: contactsResult.data?.length || 0
      };
    },
    enabled: isAuthenticated
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication - replace with real authentication
    if (loginForm.email === 'admin@myballoons.com' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('Welcome to Admin Panel!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="h-12 w-12 text-brand-red" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-brand-red hover:bg-red-600">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>Demo credentials:</p>
              <p>Email: admin@myballoons.com</p>
              <p>Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Products</p>
                  <p className="text-2xl font-bold">{stats?.totalProducts || 0}</p>
                </div>
                <Package className="h-8 w-8 text-brand-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-brand-yellow" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-600">{stats?.pendingOrders || 0}</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Pending</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Unread Messages</p>
                  <p className="text-2xl font-bold text-red-600">{stats?.unreadContacts || 0}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-brand-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Product Management</TabsTrigger>
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
          
          <TabsContent value="contacts">
            <ContactManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
