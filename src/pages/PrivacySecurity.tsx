
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Lock, Eye, Smartphone, Key, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PrivacySecurity = () => {
  const navigate = useNavigate();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password don't match.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock password change
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    setIsPasswordDialogOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const securityOptions = [
    {
      title: 'Change Password',
      description: 'Update your account password',
      icon: Lock,
      action: () => setIsPasswordDialogOpen(true)
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: Smartphone,
      action: () => toast({ title: "Coming Soon", description: "Two-factor authentication will be available soon." })
    },
    {
      title: 'Login Activity',
      description: 'View recent login activity',
      icon: Eye,
      action: () => toast({ title: "Login Activity", description: "Last login: Today at 10:30 AM" })
    },
    {
      title: 'App Permissions',
      description: 'Manage app permissions and data access',
      icon: Key,
      action: () => toast({ title: "Permissions", description: "All permissions are currently enabled." })
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
          <h1 className="text-lg font-semibold">Privacy & Security</h1>
        </div>
        <Shield className="h-5 w-5 text-orange-600" />
      </div>

      <div className="p-4 space-y-4">
        {/* Security Settings */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Security Settings</h3>
            </div>
            
            {securityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.title}>
                  <button
                    onClick={option.action}
                    className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <div className="text-left">
                        <h4 className="font-medium">{option.title}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Data & Privacy</h3>
            </div>
            
            <button className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors border-b">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <h4 className="font-medium">Download Your Data</h4>
                  <p className="text-sm text-gray-600">Get a copy of your account data</p>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => setIsDeleteDialogOpen(true)}
              className="flex items-center justify-between w-full p-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="h-5 w-5" />
                <div className="text-left">
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-red-500">Permanently delete your account</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input
                id="current"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="new">New Password</Label>
              <Input
                id="new"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input
                id="confirm"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsPasswordDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordChange} className="flex-1">
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Account</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
          </p>
          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Account Deletion",
                  description: "Account deletion request has been submitted.",
                  variant: "destructive"
                });
                setIsDeleteDialogOpen(false);
              }}
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

export default PrivacySecurity;
