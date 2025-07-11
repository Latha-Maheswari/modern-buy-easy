
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import BottomNavigation from '../components/BottomNavigation';
import EditProfileModal from '../components/EditProfileModal';
import AddressManager from '../components/AddressManager';
import PaymentMethods from '../components/PaymentMethods';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  User, 
  Package, 
  Heart, 
  Bell, 
  HelpCircle, 
  Shield, 
  LogOut,
  ChevronRight,
  Edit,
  Trash2
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleDeleteAccount = () => {
    // Mock account deletion - in real app, this would call API
    logout();
    navigate('/');
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted.",
      variant: "destructive",
    });
  };

  const isProfileIncomplete = !user?.name || !user?.email;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-lg font-semibold">My Account</h1>
      </div>

      {/* Profile Completion Prompt */}
      {isProfileIncomplete && (
        <Card className="m-4 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <p className="font-medium text-orange-800">Complete Your Profile</p>
                <p className="text-sm text-orange-700">
                  Complete your profile to personalize your experience.
                </p>
              </div>
              <Button 
                size="sm" 
                onClick={() => setIsEditModalOpen(true)}
                className="ml-auto bg-orange-600 hover:bg-orange-700"
              >
                Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Profile Section */}
      <Card className="m-4">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-orange-500 text-white text-xl">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{user?.name || 'Complete your profile'}</h2>
              <p className="text-gray-600">{user?.email || 'Add your email'}</p>
              <p className="text-gray-600">
                {user?.phone || 'Add your phone number'}
              </p>
              <div className="flex items-center mt-2">
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  {isProfileIncomplete ? 'Profile Incomplete' : 'Verified Member'}
                </span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-xs text-gray-600">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">{wishlistCount}</div>
            <div className="text-xs text-gray-600">Wishlist Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">-</div>
            <div className="text-xs text-gray-600">Reviews</div>
          </CardContent>
        </Card>
      </div>

      {/* Empty Orders Section */}
      <Card className="m-4">
        <CardContent className="p-6 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 text-sm mb-4">
            Your order history will appear here after you make your first purchase
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/home')}
            className="text-orange-600"
          >
            Start Shopping
          </Button>
        </CardContent>
      </Card>

      {/* Address Manager */}
      <div className="mx-4 mb-4">
        <AddressManager />
      </div>

      {/* Payment Methods */}
      <div className="mx-4 mb-4">
        <PaymentMethods />
      </div>

      {/* Preferences & Settings */}
      <Card className="m-4">
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Preferences & Settings</h3>
          </div>
          
          {[
            { icon: Heart, label: `Wishlist (${wishlistCount})`, action: () => navigate('/wishlist') },
            { icon: Package, label: 'My Orders', action: () => navigate('/orders') },
            { icon: Bell, label: 'Notifications', action: () => navigate('/notifications') },
            { icon: Shield, label: 'Privacy & Security', action: () => navigate('/privacy-security') },
            { icon: HelpCircle, label: 'Help & Support', action: () => navigate('/help-support') },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <button
                  onClick={item.action}
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
                {index < 4 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="m-4">
        <CardContent className="p-0">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex items-center space-x-3 w-full p-4 text-red-600 hover:bg-red-50 transition-colors border-b"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center space-x-3 w-full p-4 text-red-700 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
            <span className="font-medium">Delete Account</span>
          </button>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Out</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">Are you sure you want to log out?</p>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-gray-600">
              Are you sure you want to permanently delete your account?
            </p>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-800 text-sm font-medium">
                This action cannot be undone. All your data will be permanently removed.
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
