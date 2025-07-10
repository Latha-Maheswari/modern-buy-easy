import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Edit, Trash2, Plus } from 'lucide-react';
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
}

const AddressManager = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '123 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      landmark: 'Near Metro Station'
    },
    {
      id: '2',
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '456 Park Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      landmark: 'Opposite Mall'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      ...address,
      landmark: address.landmark || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr
      ));
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully.",
      });
    } else {
      const newAddress = { ...formData, id: Date.now().toString() };
      setAddresses([...addresses, newAddress]);
      toast({
        title: "Address Added",
        description: "New address has been added successfully.",
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Address Deleted",
      description: "Address has been removed from your account.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Saved Addresses
        </CardTitle>
        <Button onClick={handleAddNew} size="sm" className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium">{address.name}</h4>
                <p className="text-sm text-gray-600">{address.phone}</p>
                <p className="text-sm mt-1">
                  {address.address}, {address.city}, {address.state} - {address.pincode}
                </p>
                {address.landmark && (
                  <p className="text-sm text-gray-500">Landmark: {address.landmark}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(address)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(address.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>

      {/* Add/Edit Address Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="landmark">Landmark (Optional)</Label>
              <Input
                id="landmark"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              />
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1 bg-orange-500 hover:bg-orange-600">
                Save Address
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

export default AddressManager;
