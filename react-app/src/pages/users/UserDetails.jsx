import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/PageWrapper';
import { Card, Badge, Button, Avatar, Tabs, Stats } from '../../components/ui';
import { Mail, Phone, MapPin, Calendar, Edit, Trash2, Lock } from 'lucide-react';

/**
 * User Details/Profile Page
 */
const UserDetails = () => {
  const { id } = useParams();
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  // Mock user data
  const user = {
    id: id || '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    status: 'Active',
    location: 'San Francisco, CA',
    joinDate: 'January 15, 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    stats: {
      projects: 12,
      tasks: 48,
      completedTasks: 36,
      hoursLogged: 156
    }
  };

  const activityTimeline = [
    { action: 'Updated profile information', time: '2 hours ago', icon: Edit },
    { action: 'Completed project "Dashboard Redesign"', time: '1 day ago', icon: Calendar },
    { action: 'Changed password', time: '3 days ago', icon: Lock },
    { action: 'Updated email preferences', time: '1 week ago', icon: Mail },
  ];

  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Stats
              label="Projects"
              value={user.stats.projects}
              trend="+2 this month"
              trendUp={true}
            />
            <Stats
              label="Total Tasks"
              value={user.stats.tasks}
              trend="+8 this week"
              trendUp={true}
            />
            <Stats
              label="Completed"
              value={user.stats.completedTasks}
              trend={`${Math.round((user.stats.completedTasks / user.stats.tasks) * 100)}%`}
              trendUp={true}
            />
            <Stats
              label="Hours Logged"
              value={user.stats.hoursLogged}
              trend="+12 this week"
              trendUp={true}
            />
          </div>

          {/* Activity Timeline */}
          <Card title="Recent Activity">
            <div className="space-y-4">
              {activityTimeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[rgba(58,109,240,0.15)] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[#3a6df0]" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[15px] ${textColor}`}>{item.action}</p>
                    <p className={`text-[14px] ${inactiveColor}`}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )
    },
    {
      label: 'Projects',
      content: (
        <Card>
          <p className={inactiveColor}>Project list would go here...</p>
        </Card>
      )
    },
    {
      label: 'Permissions',
      content: (
        <Card>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={textColor}>Can create users</span>
              <Badge color="green">Allowed</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className={textColor}>Can delete users</span>
              <Badge color="green">Allowed</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className={textColor}>Can manage billing</span>
              <Badge color="red">Denied</Badge>
            </div>
          </div>
        </Card>
      )
    }
  ];

  return (
    <PageWrapper title="User Details">
      <div className="space-y-6 mt-6">
        {/* User Info Card */}
        <Card>
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <Avatar src={user.avatar} alt={user.name} size="xl" />

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className={`text-[20px] font-medium mb-2 ${textColor}`}>{user.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge color="blue">{user.role}</Badge>
                    <Badge color="green">{user.status}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" leftIcon={<Trash2 className="w-4 h-4" />}>
                    Delete
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className={`w-4 h-4 ${inactiveColor}`} />
                  <span className={`text-[15px] ${textColor}`}>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className={`w-4 h-4 ${inactiveColor}`} />
                  <span className={`text-[15px] ${textColor}`}>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${inactiveColor}`} />
                  <span className={`text-[15px] ${textColor}`}>{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${inactiveColor}`} />
                  <span className={`text-[15px] ${textColor}`}>Joined {user.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs tabs={tabs} />
      </div>
    </PageWrapper>
  );
};

export default UserDetails;
