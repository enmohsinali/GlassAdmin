import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { Card, Input, Select, Textarea, Button, Switch, Alert } from '../../components/ui';
import { Save, X } from 'lucide-react';

/**
 * User Edit Page
 */
const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'admin',
    status: 'active',
    bio: 'Senior software engineer with 10+ years of experience.',
    isActive: true,
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/dashboard/users/${id}`);
      }, 1500);
    }, 1000);
  };

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' },
  ];

  return (
    <PageWrapper title="Edit User">
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {showSuccess && (
          <Alert variant="success" title="Success!">
            User information has been updated successfully.
          </Alert>
        )}

        {/* Personal Information */}
        <Card title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <Textarea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </Card>

        {/* Role & Status */}
        <Card title="Role & Status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
            />
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />
          </div>
        </Card>

        {/* Preferences */}
        <Card title="Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Account Active</div>
                <div className="text-[14px] opacity-70">Enable or disable this user account</div>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => handleSwitchChange('isActive', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Email Notifications</div>
                <div className="text-[14px] opacity-70">Receive email notifications</div>
              </div>
              <Switch
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[15px] font-medium">Push Notifications</div>
                <div className="text-[14px] opacity-70">Receive push notifications</div>
              </div>
              <Switch
                checked={formData.pushNotifications}
                onCheckedChange={(checked) => handleSwitchChange('pushNotifications', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Save className="w-4 h-4" />}
            loading={isLoading}
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            leftIcon={<X className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default UserEdit;
