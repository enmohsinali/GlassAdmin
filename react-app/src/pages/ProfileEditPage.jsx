import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Card, Input, Textarea, Button, Avatar, Alert, Select } from '../components/ui';
import { Save, Upload, X } from 'lucide-react';

/**
 * Profile Edit Page
 * Edit user profile information
 */
const ProfileEditPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Tech Corp',
    role: 'Senior Software Engineer',
    bio: 'Passionate software engineer with 10+ years of experience in web development.',
    website: 'https://johndoe.com',
    twitter: '@johndoe',
    linkedin: 'johndoe',
    github: 'johndoe',
  });

  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?w=400');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const handleCancel = () => {
    // Navigate back or reset form
    window.history.back();
  };

  return (
    <PageWrapper
      title="Edit Profile"
      description="Update your personal information"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Profile', path: '/dashboard/profile' },
        { label: 'Edit', path: '/dashboard/profile/edit' },
      ]}
    >
      {showSuccess && (
        <Alert
          type="success"
          title="Profile Updated"
          dismissible
          onDismiss={() => setShowSuccess(false)}
        >
          Your profile has been successfully updated.
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <Card title="Profile Picture">
          <div className="flex items-center gap-6">
            <Avatar src={avatar} alt="Profile" size="2xl" />
            <div>
              <p className="text-sm text-muted mb-3">
                Upload a new profile picture. Recommended size: 400x400px
              </p>
              <div className="flex gap-2">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button
                    type="button"
                    variant="secondary"
                    leftIcon={<Upload className="w-4 h-4" />}
                    as="span"
                  >
                    Upload Photo
                  </Button>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  leftIcon={<X className="w-4 h-4" />}
                  onClick={() => setAvatar('https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?w=400')}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <Card title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
            />
            <Input
              label="Location"
              name="location"
              value={profileData.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
            <Input
              label="Company"
              name="company"
              value={profileData.company}
              onChange={handleChange}
            />
          </div>
        </Card>

        {/* Professional Information */}
        <Card title="Professional Information">
          <div className="space-y-4">
            <Input
              label="Job Title"
              name="role"
              value={profileData.role}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
            />
            <Textarea
              label="Bio"
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself..."
              helperText="Brief description of your professional background (max 200 characters)"
            />
          </div>
        </Card>

        {/* Social Links */}
        <Card title="Social Links">
          <div className="space-y-4">
            <Input
              label="Website"
              type="url"
              name="website"
              value={profileData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />
            <Input
              label="Twitter"
              name="twitter"
              value={profileData.twitter}
              onChange={handleChange}
              placeholder="@username"
            />
            <Input
              label="LinkedIn"
              name="linkedin"
              value={profileData.linkedin}
              onChange={handleChange}
              placeholder="username"
            />
            <Input
              label="GitHub"
              name="github"
              value={profileData.github}
              onChange={handleChange}
              placeholder="username"
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <Card>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              leftIcon={<Save className="w-4 h-4" />}
              loading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </form>
    </PageWrapper>
  );
};

export default ProfileEditPage;
