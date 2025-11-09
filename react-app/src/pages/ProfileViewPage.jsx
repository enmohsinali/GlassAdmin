import PageWrapper from '../components/PageWrapper';
import { Card, Avatar, Badge, Button, Stats } from '../components/ui';
import { Mail, Phone, MapPin, Calendar, Briefcase, Edit, MessageSquare } from 'lucide-react';

/**
 * Simple Profile View Page
 * Clean, minimal profile view (read-only)
 */
const ProfileViewPage = () => {
  const user = {
    name: 'John Doe',
    role: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    company: 'Tech Corp',
    avatar: 'https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?w=400',
    bio: 'Passionate software engineer with 10+ years of experience in web development. Love building scalable applications and mentoring junior developers.',
  };

  const stats = [
    { label: 'Projects', value: '24', color: 'primary' },
    { label: 'Tasks', value: '156', color: 'success' },
    { label: 'Team Members', value: '8', color: 'warning' },
    { label: 'Achievements', value: '12', color: 'danger' },
  ];

  return (
    <PageWrapper
      title="User Profile"
      description="View user information"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Profile View', path: '/dashboard/profile-view' },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <Card className="mb-6">
          <div className="flex flex-col items-center text-center mb-6">
            {/* Avatar */}
            <Avatar src={user.avatar} alt={user.name} size="2xl" className="mb-4" />

            {/* Name & Role */}
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-muted mb-3">{user.role}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Badge variant="primary">Pro Member</Badge>
              <Badge variant="success">Verified</Badge>
              <Badge variant="secondary">Active</Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="primary" leftIcon={<MessageSquare className="w-4 h-4" />}>
                Message
              </Button>
              <Button variant="secondary" leftIcon={<Edit className="w-4 h-4" />}>
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-muted">{user.bio}</p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Stats
              key={index}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>

        {/* Contact Information */}
        <Card title="Contact Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/5 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/5 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">Phone</p>
                <p className="text-sm font-medium">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/5 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">Location</p>
                <p className="text-sm font-medium">{user.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/5 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted">Company</p>
                <p className="text-sm font-medium">{user.company}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default ProfileViewPage;
