import PageWrapper from '../components/PageWrapper';
import { Card, Avatar, Badge, Button, Tabs, Progress } from '../components/ui';
import { Mail, MapPin, Calendar, Briefcase, Edit, Settings, User } from 'lucide-react';

/**
 * User Profile Page
 * Main profile view with tabs for overview, activity, and projects
 */
const ProfilePage = () => {

  // Mock user data
  const user = {
    name: 'John Doe',
    role: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    avatar: 'https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?w=400',
    bio: 'Passionate software engineer with 10+ years of experience in web development. Love building scalable applications and mentoring junior developers.',
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 75 },
    ],
    stats: [
      { label: 'Projects', value: 24 },
      { label: 'Tasks Completed', value: 156 },
      { label: 'Team Members', value: 8 },
      { label: 'Achievements', value: 12 },
    ],
  };

  const recentActivity = [
    {
      action: 'Completed task',
      description: 'Implement user authentication',
      time: '2 hours ago',
      type: 'success',
    },
    {
      action: 'Created project',
      description: 'E-commerce Dashboard',
      time: '5 hours ago',
      type: 'info',
    },
    {
      action: 'Updated profile',
      description: 'Changed profile picture',
      time: '1 day ago',
      type: 'default',
    },
    {
      action: 'Joined team',
      description: 'Marketing Team',
      time: '3 days ago',
      type: 'success',
    },
  ];

  const projects = [
    {
      name: 'E-commerce Platform',
      status: 'In Progress',
      progress: 75,
      deadline: '2025-12-15',
    },
    {
      name: 'Mobile App Redesign',
      status: 'Completed',
      progress: 100,
      deadline: '2025-11-01',
    },
    {
      name: 'API Integration',
      status: 'In Progress',
      progress: 45,
      deadline: '2025-12-30',
    },
  ];

  const tabs = [
    {
      label: 'Overview',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          {/* Bio */}
          <Card title="About">
            <p className="text-muted">{user.bio}</p>
          </Card>

          {/* Skills */}
          <Card title="Skills">
            <div className="space-y-4">
              {user.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} color="primary" />
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Info */}
          <Card title="Contact Information">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted" />
                <span className="text-sm">{user.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted" />
                <span className="text-sm">Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-muted" />
                <span className="text-sm">{user.role}</span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      label: 'Activity',
      icon: <Calendar className="w-4 h-4" />,
      content: (
        <Card title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted">{activity.description}</p>
                    </div>
                    <Badge variant={activity.type} size="sm">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ),
    },
    {
      label: 'Projects',
      icon: <Briefcase className="w-4 h-4" />,
      content: (
        <Card title="Active Projects">
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="p-4 bg-muted/5 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-muted">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={project.status === 'Completed' ? 'success' : 'primary'}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} color={project.progress === 100 ? 'success' : 'primary'} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ),
    },
  ];

  return (
    <PageWrapper
      title="Profile"
      description="View and manage your profile"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Profile', path: '/dashboard/profile' },
      ]}
    >
      {/* Profile Header */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <Avatar src={user.avatar} alt={user.name} size="2xl" />

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-muted mb-3">{user.role}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="primary">Pro Member</Badge>
              <Badge variant="success">Verified</Badge>
              <Badge variant="secondary">Top Contributor</Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="primary" leftIcon={<Edit className="w-4 h-4" />}>
              Edit Profile
            </Button>
            <Button variant="secondary" leftIcon={<Settings className="w-4 h-4" />}>
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {user.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs Content */}
      <Tabs tabs={tabs} />
    </PageWrapper>
  );
};

export default ProfilePage;
