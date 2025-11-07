import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Card, Input, Button, Switch, Alert, Tabs } from '../components/ui';
import { Save, User, Bell, Lock, Shield, Palette } from 'lucide-react';
import BackgroundSettings from '../components/BackgroundSettings';

/**
 * User Settings Page
 */
const Settings = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Senior software engineer with 10+ years of experience.',
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    productUpdates: true,
    securityAlerts: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (name, value) => {
    setNotifications(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    {
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      content: (
        <Card title="Profile Information">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
            />
            <Input
              label="Bio"
              name="bio"
              value={profileData.bio}
              onChange={handleProfileChange}
            />
            <Button
              type="submit"
              variant="primary"
              leftIcon={<Save className="w-4 h-4" />}
              loading={isLoading}
            >
              Save Changes
            </Button>
          </form>
        </Card>
      )
    },
    {
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      content: (
        <Card title="Notification Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Email Notifications</div>
                <div className="text-[14px] opacity-70">Receive email updates and alerts</div>
              </div>
              <Switch
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Push Notifications</div>
                <div className="text-[14px] opacity-70">Receive push notifications on your device</div>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Weekly Digest</div>
                <div className="text-[14px] opacity-70">Get a weekly summary of your activity</div>
              </div>
              <Switch
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Product Updates</div>
                <div className="text-[14px] opacity-70">Get notified about new features</div>
              </div>
              <Switch
                checked={notifications.productUpdates}
                onCheckedChange={(checked) => handleNotificationChange('productUpdates', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Security Alerts</div>
                <div className="text-[14px] opacity-70">Important security notifications</div>
              </div>
              <Switch
                checked={notifications.securityAlerts}
                onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)}
              />
            </div>
            <Button
              variant="primary"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSubmit}
              loading={isLoading}
            >
              Save Preferences
            </Button>
          </div>
        </Card>
      )
    },
    {
      label: 'Security',
      icon: <Lock className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <Card title="Change Password">
            <form className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
              />
              <Button variant="primary" leftIcon={<Lock className="w-4 h-4" />}>
                Update Password
              </Button>
            </form>
          </Card>

          <Card title="Two-Factor Authentication">
            <p className="text-[15px] mb-4 opacity-70">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <Button variant="outline" leftIcon={<Shield className="w-4 h-4" />}>
              Enable 2FA
            </Button>
          </Card>
        </div>
      )
    },
    {
      label: 'Appearance',
      icon: <Palette className="w-4 h-4" />,
      content: <BackgroundSettings />
    }
  ];

  return (
    <PageWrapper title="Settings">
      <div className="mt-6">
        {showSuccess && (
          <Alert variant="success" title="Success!" className="mb-6">
            Your settings have been updated successfully.
          </Alert>
        )}
        <Tabs tabs={tabs} />
      </div>
    </PageWrapper>
  );
};

export default Settings;
