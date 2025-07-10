
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  Eye,
  Star,
  Truck,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Mock recent orders data
  const recentOrders = [
    {
      id: 'ORD001',
      status: 'Delivered',
      date: '2024-01-15',
      total: '₹1,299',
      items: [
        { name: 'Wireless Earbuds', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' }
      ],
      statusColor: 'text-green-600'
    },
    {
      id: 'ORD002',
      status: 'Processing',
      date: '2024-01-12',
      total: '₹2,499',
      items: [
        { name: 'Smart Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' }
      ],
      statusColor: 'text-blue-600'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing': return <Truck className="h-4 w-4 text-blue-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="text-lg font-semibold">My Account</h1>
      </div>

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
              <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-600">+91 9876543210</p>
              <div className="flex items-center mt-2">
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  Premium Member
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
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-xs text-gray-600">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">8</div>
            <div className="text-xs text-gray-600">Wishlist Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">4.5</div>
            <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Reviews
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="m-4">
        <CardContent className="p-0">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Orders
            </h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/orders')}
              className="text-orange-600"
            >
              View All
            </Button>
          </div>
          
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 border-b last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="font-medium">#{order.id}</span>
                </div>
                <span className={`text-sm font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <img
                  src={order.items[0].image}
                  alt={order.items[0].name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{order.items[0].name}</p>
                  <p className="text-xs text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.total}</p>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
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
            { icon: Heart, label: 'Wishlist', action: () => console.log('Wishlist') },
            { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
            { icon: Shield, label: 'Privacy & Security', action: () => console.log('Privacy & Security') },
            { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help & Support') },
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
                {index < 3 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Card className="m-4">
        <CardContent className="p-0">
          <button
            onClick={() => setIsLogoutDialogOpen(true)}
            className="flex items-center space-x-3 w-full p-4 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
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

      <BottomNavigation />
    </div>
  );
};

export default Profile;
