
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Plus, Edit, Trash2, Smartphone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi';
  name: string;
  details: string;
  maskedNumber?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formType, setFormType] = useState<'card' | 'upi'>('card');
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: '',
  });
  const [upiForm, setUpiForm] = useState({
    upiId: '',
    name: '',
  });

  const handleSavePaymentMethod = () => {
    if (formType === 'card') {
      if (!cardForm.cardNumber || !cardForm.expiryMonth || !cardForm.expiryYear || !cardForm.cvv || !cardForm.nameOnCard) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all card details.",
          variant: "destructive",
        });
        return;
      }

      const maskedNumber = `**** **** **** ${cardForm.cardNumber.slice(-4)}`;
      const expiryDate = `${cardForm.expiryMonth}/${cardForm.expiryYear}`;
      
      const newMethod: PaymentMethod = {
        id: editingMethod?.id || Math.random().toString(36).substr(2, 9),
        type: 'card',
        name: cardForm.nameOnCard,
        details: `Card ending in ${cardForm.cardNumber.slice(-4)}`,
        maskedNumber,
        expiryDate,
        isDefault: paymentMethods.length === 0,
      };

      if (editingMethod) {
        setPaymentMethods(prev => prev.map(method => 
          method.id === editingMethod.id ? newMethod : method
        ));
        toast({
          title: "Card Updated",
          description: "Your payment method has been updated successfully.",
        });
      } else {
        setPaymentMethods(prev => [...prev, newMethod]);
        toast({
          title: "Card Added",
          description: "Your payment method has been saved successfully.",
        });
      }
    } else {
      if (!upiForm.upiId || !upiForm.name) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in all UPI details.",
          variant: "destructive",
        });
        return;
      }

      const newMethod: PaymentMethod = {
        id: editingMethod?.id || Math.random().toString(36).substr(2, 9),
        type: 'upi',
        name: upiForm.name,
        details: upiForm.upiId,
        isDefault: paymentMethods.length === 0,
      };

      if (editingMethod) {
        setPaymentMethods(prev => prev.map(method => 
          method.id === editingMethod.id ? newMethod : method
        ));
        toast({
          title: "UPI Updated",
          description: "Your UPI ID has been updated successfully.",
        });
      } else {
        setPaymentMethods(prev => [...prev, newMethod]);
        toast({
          title: "UPI Added",
          description: "Your UPI ID has been saved successfully.",
        });
      }
    }

    setIsPaymentModalOpen(false);
    resetForms();
  };

  const handleEditMethod = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormType(method.type);
    
    if (method.type === 'card') {
      // For editing, we can't retrieve the actual card number, so we'll show empty form
      setCardForm({
        cardNumber: '',
        expiryMonth: method.expiryDate?.split('/')[0] || '',
        expiryYear: method.expiryDate?.split('/')[1] || '',
        cvv: '',
        nameOnCard: method.name,
      });
    } else {
      setUpiForm({
        upiId: method.details,
        name: method.name,
      });
    }
    
    setIsPaymentModalOpen(true);
  };

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    toast({
      title: "Payment Method Deleted",
      description: "The payment method has been removed from your account.",
    });
  };

  const resetForms = () => {
    setCardForm({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      nameOnCard: '',
    });
    setUpiForm({
      upiId: '',
      name: '',
    });
    setEditingMethod(null);
  };

  const handleAddNew = () => {
    resetForms();
    setFormType('card');
    setIsPaymentModalOpen(true);
  };

  const getPaymentIcon = (type: 'card' | 'upi') => {
    return type === 'card' ? CreditCard : Smartphone;
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Methods
            </CardTitle>
            <Button
              onClick={handleAddNew}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-6">
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No payment methods added yet</p>
              <Button
                onClick={handleAddNew}
                variant="outline"
                size="sm"
              >
                Add Payment Method
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const Icon = getPaymentIcon(method.type);
                return (
                  <div key={method.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            {method.isDefault && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {method.type === 'card' ? method.maskedNumber : method.details}
                          </p>
                          {method.expiryDate && (
                            <p className="text-xs text-gray-500">
                              Expires: {method.expiryDate}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMethod(method)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMethod(method.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select value={formType} onValueChange={(value: 'card' | 'upi') => setFormType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formType === 'card' ? (
              <>
                <div>
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    value={cardForm.nameOnCard}
                    onChange={(e) => setCardForm({ ...cardForm, nameOnCard: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={cardForm.cardNumber}
                    onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="expiryMonth">Month</Label>
                    <Select value={cardForm.expiryMonth} onValueChange={(value) => setCardForm({ ...cardForm, expiryMonth: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expiryYear">Year</Label>
                    <Select value={cardForm.expiryYear} onValueChange={(value) => setCardForm({ ...cardForm, expiryYear: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="YY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i} value={String(25 + i)}>
                            {25 + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="upiName">Name</Label>
                  <Input
                    id="upiName"
                    value={upiForm.name}
                    onChange={(e) => setUpiForm({ ...upiForm, name: e.target.value })}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={upiForm.upiId}
                    onChange={(e) => setUpiForm({ ...upiForm, upiId: e.target.value })}
                    placeholder="yourname@paytm"
                  />
                </div>
              </>
            )}
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSavePaymentMethod}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {editingMethod ? 'Update Method' : 'Save Method'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentMethods;
