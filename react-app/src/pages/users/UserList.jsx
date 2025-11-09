import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { Card, Button, Input, Badge, Avatar } from '../../components/ui';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  MoreVertical,
} from 'lucide-react';

/**
 * User List Page
 * Apple iOS 26 Liquid Glass UI inspired design
 */
const UserList = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Theme-aware colors with WCAG AA compliant contrast ratios
  const subtitleColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const tableHeaderColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#5a5a5a]';
  const secondaryTextColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const timestampColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#5a5a5a]';

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      role: 'Admin',
      status: 'Active',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3a6df0&color=fff',
      lastActive: '2 min ago',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      role: 'Manager',
      status: 'Active',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=3bf083&color=fff',
      lastActive: '15 min ago',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 234 567 8902',
      role: 'User',
      status: 'Active',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff',
      lastActive: '1 hour ago',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+1 234 567 8903',
      role: 'User',
      status: 'Inactive',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=ff705c&color=fff',
      lastActive: '2 days ago',
    },
    {
      id: 5,
      name: 'Tom Brown',
      email: 'tom.brown@example.com',
      phone: '+1 234 567 8904',
      role: 'Manager',
      status: 'Active',
      avatar: 'https://ui-avatars.com/api/?name=Tom+Brown&background=fbbf24&color=fff',
      lastActive: '5 min ago',
    },
  ];

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'primary';
      case 'Manager':
        return 'success';
      case 'User':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'Active' ? 'success' : 'error';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={cn(
              'text-3xl font-bold',
              isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
            )}
          >
            Users
          </h1>
          <p className={cn('mt-2 text-[15px]', subtitleColor)}>
            Manage your users and their permissions.
          </p>
        </div>
        <Button variant="glass" leftIcon={<Plus className="w-4 h-4" />}>
          Add User
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="md">
              All Users
            </Button>
            <Button variant="ghost" size="md">
              Active
            </Button>
            <Button variant="ghost" size="md">
              Inactive
            </Button>
          </div>
        </div>
      </Card>

      {/* Users List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={cn(
                  'border-b',
                  isDark ? 'border-border-dark' : 'border-border-light'
                )}
              >
                <th
                  className={cn(
                    'text-left py-3 px-4 text-sm font-semibold uppercase tracking-wide',
                    tableHeaderColor
                  )}
                >
                  User
                </th>
                <th
                  className={cn(
                    'text-left py-3 px-4 text-sm font-semibold uppercase tracking-wide',
                    tableHeaderColor
                  )}
                >
                  Contact
                </th>
                <th
                  className={cn(
                    'text-left py-3 px-4 text-sm font-semibold uppercase tracking-wide',
                    tableHeaderColor
                  )}
                >
                  Role
                </th>
                <th
                  className={cn(
                    'text-left py-3 px-4 text-sm font-semibold uppercase tracking-wide',
                    tableHeaderColor
                  )}
                >
                  Status
                </th>
                <th
                  className={cn(
                    'text-left py-3 px-4 text-sm font-semibold uppercase tracking-wide',
                    tableHeaderColor
                  )}
                >
                  Last Active
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={cn(
                    'border-b transition-colors duration-200',
                    isDark
                      ? 'border-border-dark hover:bg-theme-dark-bg'
                      : 'border-border-light hover:bg-theme-light-bg'
                  )}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        size="md"
                        status={user.status === 'Active' ? 'online' : 'offline'}
                      />
                      <div>
                        <p
                          className={cn(
                            'font-medium',
                            isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                          )}
                        >
                          {user.name}
                        </p>
                        <p className={cn('text-sm font-medium', secondaryTextColor)}>
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary-blue" />
                        <span
                          className={cn(
                            'text-sm',
                            isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                          )}
                        >
                          {user.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary-green" />
                        <span className={cn('text-sm font-medium', secondaryTextColor)}>
                          {user.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={getStatusBadgeColor(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className={cn('py-4 px-4 text-sm font-medium', timestampColor)}>
                    {user.lastActive}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className={cn(
                          'p-2 rounded-lg transition-all duration-300',
                          isDark
                            ? 'hover:bg-theme-dark-bg text-primary-blue'
                            : 'hover:bg-theme-light-bg text-primary-blue'
                        )}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className={cn(
                          'p-2 rounded-lg transition-all duration-300',
                          isDark
                            ? 'hover:bg-theme-dark-bg text-primary-red'
                            : 'hover:bg-theme-light-bg text-primary-red'
                        )}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        className={cn(
                          'p-2 rounded-lg transition-all duration-300',
                          isDark
                            ? 'hover:bg-theme-dark-bg text-[#f9fafb]'
                            : 'hover:bg-theme-light-bg text-[#1a1a1a]'
                        )}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t',
            isDark ? 'border-border-dark' : 'border-border-light'
          )}
        >
          <p className={cn('text-[13px] sm:text-sm font-medium', secondaryTextColor)}>
            Showing 1 to 5 of 5 users
          </p>
          <div className="flex gap-1 sm:gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserList;
