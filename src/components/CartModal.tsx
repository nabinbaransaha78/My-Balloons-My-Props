
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock_quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  totalPrice: number;
}

const CartModal = ({ isOpen, onClose, cart, updateQuantity, totalPrice }: CartModalProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp.slice(-6)}${random}`;
  };

  const handleCheckout = async () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const orderNumber = generateOrderNumber();
      
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: formData.fullName,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: formData.address,
          payment_method: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI',
          total_amount: totalPrice,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send email notification (simulate email sending)
      const orderDetails = {
        orderNumber,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI',
        items: cart,
        totalAmount: totalPrice
      };

      console.log('Order submitted - Email would be sent to myballoonsjayanagar@gmail.com:', orderDetails);

      // Clear cart
      localStorage.removeItem('cart');
      
      toast.success(`Order placed successfully! Order number: ${orderNumber}`);
      onClose();
      setIsCheckingOut(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'cod'
      });
      
      // Refresh page to clear cart state
      window.location.reload();
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Your Cart</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
            <Button onClick={onClose} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span>{isCheckingOut ? 'Checkout' : 'Your Cart'}</span>
          </DialogTitle>
        </DialogHeader>

        {!isCheckingOut ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock_quantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateQuantity(item.id, 0)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />
            
            {/* Cart Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total: ₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Continue Shopping
                </Button>
                <Button 
                  onClick={() => setIsCheckingOut(true)}
                  className="flex-1 bg-brand-red hover:bg-red-600"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Checkout Form */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Shipping Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your complete shipping address"
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Payment Method</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI (Pay on Delivery)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Order Summary */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsCheckingOut(false)}
                className="flex-1"
              >
                Back to Cart
              </Button>
              <Button 
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="flex-1 bg-brand-red hover:bg-red-600"
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
