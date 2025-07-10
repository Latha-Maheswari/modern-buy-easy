import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreditCard, Edit, Trash2, Plus, Smartphone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  name: string;
  details: string;
  provider?: string;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'HDFC Credit Card',
      details: '**** **** **** 1234',
      provider: 'Visa'
    },
    {
      id: '2',
      type: 'upi',
      name: 'PhonePe UPI',
      details: 'john.doe@paytm',
      provider: 'UPI'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<'card' | 'upi'>('card');

  const handleAddNew = (type: 'card' | 'upi') => {
    setPaymentType(type);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast({
      title: "Payment Method Removed",
      description: "Payment method has been removed from your account.",
    });
  };

  const getIcon = (type: string) => {
    return type === 'card' ? <CreditCard className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />;
  };

  const getProviderColor = (provider?: string) => {
    switch (provider) {
      case 'Visa': return 'text-blue-600';
      case 'Mastercard': return 'text-red-600';
      case 'RuPay': return 'text-green-600';
      case 'UPI': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Methods
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add Payment Method Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleAddNew('card')}
            className="h-12 flex flex-col items-center justify-center"
          >
            <CreditCard className="h-5 w-5 mb-1" />
            <span className="text-sm">Add Card</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAddNew('upi')}
            className="h-12 flex flex-col items-center justify-center"
          >
            <Smartphone className="h-5 w-5 mb-1" />
            <span className="text-sm">Add UPI</span>
          </Button>
        </div>

        {/* Existing Payment Methods */}
        {paymentMethods.map((method) => (
          <div key={method.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {getIcon(method.type)}
                <div>
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.details}</p>
                  {method.provider && (
                    <span className={`text-xs font-medium ${getProviderColor(method.provider)}`}>
                      {method.provider}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(method.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {paymentMethods.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No payment methods added yet</p>
          </div>
        )}
      </CardContent>

      {/* Add Payment Method Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Add {paymentType === 'card' ? 'Credit/Debit Card' : 'UPI ID'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {paymentType === 'card' ? (
              <>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Doe" />
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
              </>
            ) : (
              <div>
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" placeholder="yourname@paytm" />
              </div>
            )}
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                Add Payment Method
              </Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaymentMethods;
