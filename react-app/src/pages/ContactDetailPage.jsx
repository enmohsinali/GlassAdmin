import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { Card, Button, Badge, Avatar, Input, Textarea, Modal } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Plus,
  DollarSign,
  CheckCircle,
  Clock,
  MessageCircle,
  FileText,
  User,
  Briefcase,
  Tag,
} from 'lucide-react';

const ContactDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  // Sample contact data - in real app, fetch by ID
  const contact = {
    id: parseInt(id),
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    position: 'Marketing Director',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active',
    tags: ['VIP', 'Partner'],
    address: '123 Tech Street, San Francisco, CA 94105',
    birthday: '1985-06-15',
    source: 'Website',
    createdAt: '2024-01-15',
    lastContact: '2025-11-05',
    dealValue: 125000,
    deals: 3,
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    twitter: '@sarahjohnson',
  };

  const activities = [
    {
      id: 1,
      type: 'email',
      title: 'Email sent: Follow-up on proposal',
      description: 'Sent proposal follow-up email regarding Q4 marketing campaign',
      timestamp: '2025-11-05 14:30',
      icon: Mail,
      color: 'rgb(var(--color-primary))',
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Meeting scheduled',
      description: 'Demo call scheduled for November 10th at 2:00 PM',
      timestamp: '2025-11-04 10:15',
      icon: Calendar,
      color: 'rgb(var(--color-purple))',
    },
    {
      id: 3,
      type: 'note',
      title: 'Note added',
      description: 'Discussed budget allocation for next quarter. Very interested in enterprise plan.',
      timestamp: '2025-11-03 16:45',
      icon: FileText,
      color: 'rgb(var(--color-warning))',
    },
    {
      id: 4,
      type: 'call',
      title: 'Phone call completed',
      description: 'Discovery call - 45 minutes. Identified key pain points.',
      timestamp: '2025-11-01 11:00',
      icon: Phone,
      color: 'rgb(var(--color-success))',
    },
    {
      id: 5,
      type: 'deal',
      title: 'Deal updated',
      description: 'Moved "Q4 Marketing Campaign" to negotiation stage',
      timestamp: '2025-10-30 09:20',
      icon: DollarSign,
      color: 'rgb(var(--color-danger))',
    },
  ];

  const deals = [
    {
      id: 1,
      name: 'Q4 Marketing Campaign',
      value: 75000,
      stage: 'Negotiation',
      probability: 75,
      closeDate: '2025-11-30',
      status: 'active',
    },
    {
      id: 2,
      name: 'Annual Support Contract',
      value: 35000,
      stage: 'Proposal',
      probability: 60,
      closeDate: '2025-12-15',
      status: 'active',
    },
    {
      id: 3,
      name: 'Website Redesign',
      value: 15000,
      stage: 'Closed Won',
      probability: 100,
      closeDate: '2025-09-20',
      status: 'won',
    },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Send contract for Q4 campaign',
      dueDate: '2025-11-08',
      priority: 'high',
      completed: false,
    },
    {
      id: 2,
      title: 'Schedule follow-up demo',
      dueDate: '2025-11-10',
      priority: 'medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Prepare pricing proposal',
      dueDate: '2025-11-07',
      priority: 'high',
      completed: true,
    },
  ];

  const notes = [
    {
      id: 1,
      content: 'Sarah is very interested in our enterprise solution. Main concerns are around integration with their existing CRM.',
      createdBy: 'John Doe',
      createdAt: '2025-11-05 15:30',
    },
    {
      id: 2,
      content: 'Decision maker for marketing budget. Can approve deals up to $100k without additional sign-off.',
      createdBy: 'Jane Smith',
      createdAt: '2025-10-28 10:15',
    },
  ];

  const stageColors = {
    'Negotiation': 'bg-warning text-white',
    'Proposal': 'bg-primary text-white',
    'Closed Won': 'bg-success text-white',
    'Closed Lost': 'bg-danger text-white',
  };

  const priorityColors = {
    high: 'bg-danger text-white',
    medium: 'bg-warning text-white',
    low: 'bg-primary text-white',
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity' },
    { id: 'deals', label: 'Deals' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'notes', label: 'Notes' },
  ];

  return (
    <PageWrapper title={`Contact - ${contact.name}`}>
      <div className="p-6 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/dashboard/contacts')}
        >
          Back to Contacts
        </Button>

        {/* Contact Header */}
        <Card>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar src={contact.avatar} alt={contact.name} size="xl" />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className={cn('text-[24px] font-bold', textColor)}>{contact.name}</h1>
                  <Badge className="bg-success text-white">{contact.status}</Badge>
                </div>
                <p className={cn('text-[16px] mb-3', mutedColor)}>
                  {contact.position} at {contact.company}
                </p>
                <div className="flex flex-wrap gap-2">
                  {contact.tags.map((tag, index) => (
                    <Badge key={index} className="bg-purple text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" leftIcon={<Edit className="w-4 h-4" />}>
                Edit
              </Button>
              <Button variant="outline">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-[rgba(249,250,251,0.1)]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className={cn('w-5 h-5', mutedColor)} />
                <div>
                  <p className={cn('text-[12px]', mutedColor)}>Email</p>
                  <p className={cn('text-[14px]', textColor)}>{contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className={cn('w-5 h-5', mutedColor)} />
                <div>
                  <p className={cn('text-[12px]', mutedColor)}>Phone</p>
                  <p className={cn('text-[14px]', textColor)}>{contact.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className={cn('w-5 h-5', mutedColor)} />
                <div>
                  <p className={cn('text-[12px]', mutedColor)}>Company</p>
                  <p className={cn('text-[14px]', textColor)}>{contact.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className={cn('w-5 h-5', mutedColor)} />
                <div>
                  <p className={cn('text-[12px]', mutedColor)}>Address</p>
                  <p className={cn('text-[14px]', textColor)}>{contact.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className={cn('w-5 h-5', mutedColor)} />
                <div>
                  <p className={cn('text-[12px]', mutedColor)}>Last Contact</p>
                  <p className={cn('text-[14px]', textColor)}>
                    {new Date(contact.lastContact).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className={cn('w-5 h-5', mutedColor)} />
                <div>
                  <p className={cn('text-[12px]', mutedColor)}>Source</p>
                  <p className={cn('text-[14px]', textColor)}>{contact.source}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Total Deal Value</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  ${contact.dealValue.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-success/10">
                <Briefcase className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Active Deals</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{contact.deals}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Open Tasks</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {tasks.filter((t) => !t.completed).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="glass-card p-1 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card title="Recent Activity">
              <div className="space-y-4">
                {activities.slice(0, 3).map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div
                        className="p-2 rounded-full h-fit"
                        style={{ backgroundColor: `${activity.color}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: activity.color }} />
                      </div>
                      <div className="flex-1">
                        <p className={cn('text-[14px] font-medium', textColor)}>
                          {activity.title}
                        </p>
                        <p className={cn('text-[13px] mb-1', mutedColor)}>
                          {activity.description}
                        </p>
                        <p className={cn('text-[12px]', mutedColor)}>{activity.timestamp}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </Card>

            {/* Active Deals */}
            <Card title="Active Deals">
              <div className="space-y-3">
                {deals
                  .filter((d) => d.status === 'active')
                  .map((deal) => (
                    <div
                      key={deal.id}
                      className="p-3 rounded-lg bg-[rgba(249,250,251,0.03)] border border-[rgba(249,250,251,0.1)]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className={cn('text-[14px] font-medium', textColor)}>
                            {deal.name}
                          </p>
                          <p className={cn('text-[13px]', mutedColor)}>
                            ${deal.value.toLocaleString()}
                          </p>
                        </div>
                        <Badge className={stageColors[deal.stage]}>{deal.stage}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className={mutedColor}>
                          Close: {new Date(deal.closeDate).toLocaleDateString()}
                        </span>
                        <span className={textColor}>{deal.probability}% probability</span>
                      </div>
                    </div>
                  ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Deals
              </Button>
            </Card>

            {/* Open Tasks */}
            <Card title="Open Tasks">
              <div className="space-y-3">
                {tasks
                  .filter((t) => !t.completed)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between p-3 rounded-lg bg-[rgba(249,250,251,0.03)] border border-[rgba(249,250,251,0.1)]"
                    >
                      <div className="flex-1">
                        <p className={cn('text-[14px] font-medium', textColor)}>
                          {task.title}
                        </p>
                        <p className={cn('text-[13px]', mutedColor)}>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                  ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Task
              </Button>
            </Card>

            {/* Recent Notes */}
            <Card title="Recent Notes">
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 rounded-lg bg-[rgba(249,250,251,0.03)] border border-[rgba(249,250,251,0.1)]">
                    <p className={cn('text-[14px] mb-2', textColor)}>{note.content}</p>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className={mutedColor}>By {note.createdBy}</span>
                      <span className={mutedColor}>{note.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Add Note
              </Button>
            </Card>
          </div>
        )}

        {activeTab === 'activity' && (
          <Card title="Activity Timeline">
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-4">
                    <div className="relative">
                      <div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: `${activity.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: activity.color }} />
                      </div>
                      {index < activities.length - 1 && (
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-[rgba(249,250,251,0.1)]" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className={cn('text-[16px] font-medium mb-1', textColor)}>
                        {activity.title}
                      </p>
                      <p className={cn('text-[14px] mb-2', mutedColor)}>
                        {activity.description}
                      </p>
                      <p className={cn('text-[13px]', mutedColor)}>{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {activeTab === 'deals' && (
          <Card title="All Deals">
            <div className="space-y-3">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="p-4 rounded-lg bg-[rgba(249,250,251,0.03)] border border-[rgba(249,250,251,0.1)]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className={cn('text-[16px] font-medium', textColor)}>{deal.name}</p>
                      <p className={cn('text-[18px] font-semibold text-primary mt-1')}>
                        ${deal.value.toLocaleString()}
                      </p>
                    </div>
                    <Badge className={stageColors[deal.stage]}>{deal.stage}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn('text-[12px]', mutedColor)}>Close Date</p>
                      <p className={cn('text-[14px]', textColor)}>
                        {new Date(deal.closeDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className={cn('text-[12px]', mutedColor)}>Probability</p>
                      <p className={cn('text-[14px]', textColor)}>{deal.probability}%</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Deal
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              className="w-full mt-4"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Create New Deal
            </Button>
          </Card>
        )}

        {activeTab === 'tasks' && (
          <Card title="All Tasks">
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[rgba(249,250,251,0.03)] border border-[rgba(249,250,251,0.1)]"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-5 h-5 rounded border-2 border-primary"
                    readOnly
                  />
                  <div className="flex-1">
                    <p
                      className={cn(
                        'text-[15px] font-medium',
                        task.completed ? 'line-through' : '',
                        textColor
                      )}
                    >
                      {task.title}
                    </p>
                    <p className={cn('text-[13px]', mutedColor)}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              className="w-full mt-4"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add New Task
            </Button>
          </Card>
        )}

        {activeTab === 'notes' && (
          <Card title="All Notes">
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-lg bg-[rgba(249,250,251,0.03)] border border-[rgba(249,250,251,0.1)]"
                >
                  <p className={cn('text-[15px] mb-3', textColor)}>{note.content}</p>
                  <div className="flex items-center justify-between text-[13px] pt-3 border-t border-[rgba(249,250,251,0.1)]">
                    <div className="flex items-center gap-2">
                      <User className={cn('w-4 h-4', mutedColor)} />
                      <span className={mutedColor}>{note.createdBy}</span>
                    </div>
                    <span className={mutedColor}>{note.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              <Textarea placeholder="Add a new note..." rows={3} />
              <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                Add Note
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
};

export default ContactDetailPage;
