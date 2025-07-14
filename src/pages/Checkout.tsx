
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, CreditCard, Truck, Shield, AlertCircle, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

  // Load saved addresses
  useEffect(() => {
    if (user?.id) {
      const addresses = localStorage.getItem(`addresses_${user.id}`);
      if (addresses) {
        const parsedAddresses = JSON.parse(addresses);
        setSavedAddresses(parsedAddresses);
        // Auto-select default address if exists
        const defaultAddress = parsedAddresses.find((addr: any) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      }
    }
  }, [user?.id]);

  const handlePlaceOrder = async () => {
    // Validation
    if (!selectedAddress) {
      toast.error('Please add a delivery address before placing your order.');
      return;
    }

    if (!selectedPayment) {
      toast.error('Please select a payment method before placing your order.');
      return;
    }

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

  const isOrderValid = selectedAddress && selectedPayment;

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
              {!selectedAddress && <AlertCircle className="h-4 w-4 ml-2 text-red-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedAddress ? (
              <div className="text-center py-4">
                <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600 mb-3">No address selected</p>
                <div className="space-y-2">
                  {savedAddresses.length > 0 ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsAddressDialogOpen(true)}
                    >
                      Choose from Saved Addresses
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/profile')}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Delivery Address
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                  <p className="font-medium">{selectedAddress.type}</p>
                  <p className="text-sm text-gray-600">{selectedAddress.street}</p>
                  <p className="text-sm text-gray-600">{selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}</p>
                  <p className="text-sm text-gray-600">Phone: {selectedAddress.phone}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAddressDialogOpen(true)}
                >
                  Change Address
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Method
              {!selectedPayment && <AlertCircle className="h-4 w-4 ml-2 text-red-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <div>
                    <span className="font-medium">Credit/Debit Card</span>
                    <p className="text-sm text-gray-600">Add card details</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center cursor-pointer flex-1">
                  <div className="h-4 w-4 mr-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <span className="font-medium">UPI</span>
                    <p className="text-sm text-gray-600">Pay using UPI ID</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center cursor-pointer flex-1">
                  <div className="h-4 w-4 mr-2 bg-green-500 rounded-full"></div>
                  <div>
                    <span className="font-medium">Cash on Delivery</span>
                    <p className="text-sm text-gray-600">Pay when you receive</p>
                  </div>
                </Label>
              </div>
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

            {selectedPayment === 'upi' && (
              <div className="mt-4">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" placeholder="yourname@paytm" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Validation Alert */}
        {!isOrderValid && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium text-orange-800">Complete Required Steps</p>
                  <p className="text-sm text-orange-700">
                    Please complete all required steps before placing your order.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                  <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
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
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-blue-600">₹{total.toFixed(2)}</span>
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
            <p className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</p>
          </div>
          <Button
            onClick={handlePlaceOrder}
            disabled={isProcessing || !isOrderValid}
            className={`w-full h-12 text-lg font-semibold ${
              isOrderValid 
                ? 'bg-orange-500 hover:bg-orange-600' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>
          {!isOrderValid && (
            <p className="text-sm text-gray-500 text-center">
              Complete address and payment details to continue
            </p>
          )}
        </div>
      </div>

      {/* Address Selection Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Delivery Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAddress?.id === address.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedAddress(address);
                  setIsAddressDialogOpen(false);
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{address.type}</span>
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{address.street}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-sm text-gray-600">Phone: {address.phone}</p>
              </div>
            ))}
            {savedAddresses.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-3">No saved addresses found</p>
                <Button 
                  onClick={() => {
                    setIsAddressDialogOpen(false);
                    navigate('/profile');
                  }}
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Add New Address
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default Checkout;
