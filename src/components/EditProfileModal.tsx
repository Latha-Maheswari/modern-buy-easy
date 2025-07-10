
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 9876543210', // Mock phone number
  });
  const [profileImage, setProfileImage] = useState<string>('');

  const handleSave = () => {
    // Mock save functionality
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    onClose();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage} />
              <AvatarFallback className="bg-orange-500 text-white text-2xl">
                {formData.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
            </label>
          </div>

          {/* Form Fields */}
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1 bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
