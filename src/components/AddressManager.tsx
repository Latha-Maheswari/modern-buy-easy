
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

const AddressManager = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });

  // Load saved addresses from localStorage
  useEffect(() => {
    if (user?.id) {
      const savedAddresses = localStorage.getItem(`addresses_${user.id}`);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    }
  }, [user?.id]);

  // Save addresses to localStorage whenever addresses change
  useEffect(() => {
    if (user?.id && addresses.length >= 0) {
      localStorage.setItem(`addresses_${user.id}`, JSON.stringify(addresses));
    }
  }, [addresses, user?.id]);

  const handleSaveAddress = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newAddress: Address = {
      id: editingAddress?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
      isDefault: addresses.length === 0,
    };

    if (editingAddress) {
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id ? newAddress : addr
      ));
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully.",
      });
    } else {
      setAddresses(prev => [...prev, newAddress]);
      toast({
        title: "Address Added",
        description: "Your new address has been saved successfully.",
      });
    }

    setIsAddressModalOpen(false);
    resetForm();
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      landmark: address.landmark || '',
    });
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast({
      title: "Address Deleted",
      description: "The address has been removed from your account.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
    });
    setEditingAddress(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddressModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              Saved Addresses
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
          {addresses.length === 0 ? (
            <div className="text-center py-6">
              <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No addresses saved yet</p>
              <Button
                onClick={handleAddNew}
                variant="outline"
                size="sm"
              >
                Add Your First Address
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{address.name}</span>
                        {address.isDefault && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                      <p className="text-sm text-gray-600">
                        {address.address}, {address.city}, {address.state} - {address.pincode}
                      </p>
                      {address.landmark && (
                        <p className="text-xs text-gray-500 mt-1">
                          Landmark: {address.landmark}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditAddress(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Address Modal */}
      <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address Line *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House/Flat No., Street Name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveAddress}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {editingAddress ? 'Update Address' : 'Save Address'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAddressModalOpen(false)}
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

export default AddressManager;
