
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, ArrowLeft, Package, Heart, Tag, Truck } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    wishlistAlerts: true,
    deliveryNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const notificationTypes = [
    {
      key: 'orderUpdates',
      title: 'Order Updates',
      description: 'Get notified about order status changes',
      icon: Package
    },
    {
      key: 'deliveryNotifications',
      title: 'Delivery Notifications',
      description: 'Notifications about delivery status and tracking',
      icon: Truck
    },
    {
      key: 'wishlistAlerts',
      title: 'Wishlist Alerts',
      description: 'Price drops and stock updates for wishlist items',
      icon: Heart
    },
    {
      key: 'promotions',
      title: 'Promotions & Deals',
      description: 'Special offers and discount notifications',
      icon: Tag
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Notifications</h1>
        </div>
        <Bell className="h-5 w-5 text-orange-600" />
      </div>

      <div className="p-4 space-y-4">
        {/* Notification Preferences */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
            </div>
            
            {notificationTypes.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="p-4 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings[item.key as keyof typeof settings]}
                      onCheckedChange={() => handleToggle(item.key)}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Delivery Method */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Delivery Method</h3>
            </div>
            
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={() => handleToggle('smsNotifications')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Notifications;
