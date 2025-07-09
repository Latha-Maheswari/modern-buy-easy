
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const addresses = [
    {
      id: 'home',
      label: 'Home',
      address: '123 Main Street, Apt 4B, New York, NY 10001',
      isDefault: true,
    },
    {
      id: 'work',
      label: 'Work',
      address: '456 Business Ave, Suite 200, New York, NY 10002',
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: 'card',
      label: 'Credit/Debit Card',
      icon: CreditCard,
      details: '**** **** **** 1234',
    },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock order ID
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Clear cart and navigate to orders
    clearCart();
    setIsProcessing(false);
    
    toast.success('Order placed successfully!');
    navigate('/orders', { 
      state: { 
        newOrder: { 
          id: orderId, 
          total: (totalPrice * 1.08).toFixed(2),
          items: items.length 
        } 
      } 
    });
  };

  const subtotal = totalPrice;
  const tax = totalPrice * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Delivery Address */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
              {addresses.map((address) => (
                <div key={address.id} className="flex items-start space-x-3">
                  <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={address.id} className="cursor-pointer">
                      <div className="flex items-center">
                        <span className="font-medium">{address.label}</span>
                        {address.isDefault && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
            <Button variant="outline" size="sm" className="mt-3">
              Add New Address
            </Button>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center cursor-pointer flex-1">
                      <Icon className="h-4 w-4 mr-2" />
                      <div>
                        <span className="font-medium">{method.label}</span>
                        <p className="text-sm text-gray-600">{method.details}</p>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>

            {selectedPayment === 'card' && (
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Order Items ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {items.length > 2 && (
                <p className="text-sm text-gray-600 text-center py-2">
                  +{items.length - 2} more items
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4 p-3 bg-green-50 rounded-lg">
              <Shield className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-green-800">Secure checkout with SSL encryption</span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-gray-600">Estimated delivery: 2-3 business days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-10">
        <div className="max-w-md mx-auto space-y-3">
          <div className="text-center">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
          <Button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg font-semibold"
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Checkout;
