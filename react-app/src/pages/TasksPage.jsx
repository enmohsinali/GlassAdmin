import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Card, Button, Badge, Avatar, Input, Textarea, Modal, Select } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Calendar,
  User,
  Tag,
  Edit,
  Trash2,
} from 'lucide-react';

const TasksPage = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed, overdue
  const [filterPriority, setFilterPriority] = useState('all'); // all, high, medium, low
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Send contract for Q4 campaign',
      description: 'Prepare and send the final contract document to Sarah Johnson for the Q4 marketing campaign',
      dueDate: '2025-11-08',
      priority: 'high',
      status: 'pending',
      contact: {
        id: 1,
        name: 'Sarah Johnson',
        company: 'TechCorp Inc.',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      tags: ['Contract', 'Sales'],
      createdAt: '2025-11-01',
    },
    {
      id: 2,
      title: 'Schedule follow-up demo',
      description: 'Book a product demo session with Michael Chen for next week',
      dueDate: '2025-11-10',
      priority: 'medium',
      status: 'pending',
      contact: {
        id: 2,
        name: 'Michael Chen',
        company: 'Innovate Solutions',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      tags: ['Demo', 'Follow-up'],
      createdAt: '2025-11-02',
    },
    {
      id: 3,
      title: 'Prepare pricing proposal',
      description: 'Create detailed pricing proposal for Enterprise plan including all features and support options',
      dueDate: '2025-11-07',
      priority: 'high',
      status: 'completed',
      contact: {
        id: 1,
        name: 'Sarah Johnson',
        company: 'TechCorp Inc.',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      tags: ['Proposal', 'Pricing'],
      createdAt: '2025-10-30',
      completedAt: '2025-11-06',
    },
    {
      id: 4,
      title: 'Follow up on proposal email',
      description: 'Check if Emily Rodriguez received and reviewed the proposal sent last week',
      dueDate: '2025-11-06',
      priority: 'medium',
      status: 'overdue',
      contact: {
        id: 3,
        name: 'Emily Rodriguez',
        company: 'Design Studio',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      tags: ['Follow-up', 'Email'],
      createdAt: '2025-10-28',
    },
    {
      id: 5,
      title: 'Prepare quarterly review presentation',
      description: 'Create presentation deck for quarterly business review meeting with Jessica Williams',
      dueDate: '2025-11-12',
      priority: 'high',
      status: 'pending',
      contact: {
        id: 5,
        name: 'Jessica Williams',
        company: 'Enterprise Corp',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      tags: ['Presentation', 'QBR'],
      createdAt: '2025-11-03',
    },
    {
      id: 6,
      title: 'Send onboarding materials',
      description: 'Email onboarding package and training resources to new client',
      dueDate: '2025-11-09',
      priority: 'low',
      status: 'pending',
      contact: {
        id: 6,
        name: 'Alex Thompson',
        company: 'Digital Agency',
        avatar: 'https://i.pravatar.cc/150?img=14',
      },
      tags: ['Onboarding', 'Training'],
      createdAt: '2025-11-04',
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    contactId: '',
  });

  const priorityColors = {
    high: 'bg-danger text-white',
    medium: 'bg-warning text-white',
    low: 'bg-primary text-white',
  };

  const statusIcons = {
    pending: Clock,
    completed: CheckCircle,
    overdue: AlertCircle,
  };

  const statusColors = {
    pending: 'rgb(var(--color-primary))',
    completed: 'rgb(var(--color-success))',
    overdue: 'rgb(var(--color-danger))',
  };

  const filterTasks = () => {
    let filtered = tasks;

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower) ||
          task.contact.name.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    // Filter by priority
    if (filterPriority !== 'all') {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }

    return filtered;
  };

  const filteredTasks = filterTasks();

  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed',
              completedAt: task.status === 'completed' ? null : new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleCreateTask = () => {
    if (newTask.title && newTask.dueDate) {
      const task = {
        id: tasks.length + 1,
        ...newTask,
        status: 'pending',
        contact: {
          id: 1,
          name: 'Sarah Johnson',
          company: 'TechCorp Inc.',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        tags: ['New'],
        createdAt: new Date().toISOString().split('T')[0],
      };
      setTasks([...tasks, task]);
      setIsNewTaskModalOpen(false);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'medium', contactId: '' });
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getTaskStats = () => {
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const overdue = tasks.filter((t) => t.status === 'overdue').length;
    const dueToday = tasks.filter(
      (t) => t.dueDate === new Date().toISOString().split('T')[0] && t.status === 'pending'
    ).length;

    return { pending, completed, overdue, dueToday };
  };

  const stats = getTaskStats();

  const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  // Update task status to overdue if needed
  const updateTaskStatuses = () => {
    setTasks(
      tasks.map((task) => ({
        ...task,
        status: isOverdue(task.dueDate, task.status) ? 'overdue' : task.status,
      }))
    );
  };

  return (
    <PageWrapper title="CRM - Tasks">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={cn('text-[28px] font-bold mb-2', textColor)}>Tasks</h1>
            <p className={cn('text-[15px]', mutedColor)}>
              Manage and track your tasks across all contacts
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            Add Task
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Pending</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{stats.pending}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-success/10">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Completed</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{stats.completed}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-danger/10">
                <AlertCircle className="w-6 h-6 text-danger" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Overdue</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{stats.overdue}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-warning/10">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Due Today</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{stats.dueToday}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tasks by title, description, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="glass-card p-1 flex gap-1">
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('completed')}
              >
                Completed
              </Button>
              <Button
                variant={filterStatus === 'overdue' ? 'primary' : 'ghost'}
                onClick={() => setFilterStatus('overdue')}
              >
                Overdue
              </Button>
            </div>
            <div className="glass-card p-1 flex gap-1">
              <Button
                variant={filterPriority === 'all' ? 'primary' : 'ghost'}
                onClick={() => setFilterPriority('all')}
              >
                All Priority
              </Button>
              <Button
                variant={filterPriority === 'high' ? 'primary' : 'ghost'}
                onClick={() => setFilterPriority('high')}
              >
                High
              </Button>
              <Button
                variant={filterPriority === 'medium' ? 'primary' : 'ghost'}
                onClick={() => setFilterPriority('medium')}
              >
                Medium
              </Button>
              <Button
                variant={filterPriority === 'low' ? 'primary' : 'ghost'}
                onClick={() => setFilterPriority('low')}
              >
                Low
              </Button>
            </div>
          </div>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const StatusIcon = statusIcons[task.status];
            return (
              <Card key={task.id} className="hover:scale-[1.01] transition-all">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-all',
                      task.status === 'completed'
                        ? 'bg-success border-success'
                        : 'border-[rgba(249,250,251,0.3)]'
                    )}
                  >
                    {task.status === 'completed' && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3
                          className={cn(
                            'text-[16px] font-semibold mb-1',
                            task.status === 'completed' ? 'line-through opacity-60' : '',
                            textColor
                          )}
                        >
                          {task.title}
                        </h3>
                        <p
                          className={cn(
                            'text-[14px] mb-3',
                            task.status === 'completed' ? 'line-through opacity-50' : '',
                            mutedColor
                          )}
                        >
                          {task.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={priorityColors[task.priority]}>
                          {task.priority}
                        </Badge>
                        <Button
                          variant="ghost"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Task Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-[13px]">
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className="w-4 h-4"
                          style={{ color: statusColors[task.status] }}
                        />
                        <span className={mutedColor}>
                          {task.status === 'completed'
                            ? `Completed ${new Date(task.completedAt).toLocaleDateString()}`
                            : `Due ${new Date(task.dueDate).toLocaleDateString()}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Avatar
                          src={task.contact.avatar}
                          alt={task.contact.name}
                          size="sm"
                        />
                        <span className={mutedColor}>
                          {task.contact.name} • {task.contact.company}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className="bg-primary/20 text-primary"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredTasks.length === 0 && (
            <Card>
              <div className="text-center py-8">
                <Clock className={cn('w-12 h-12 mx-auto mb-3', mutedColor)} />
                <p className={cn('text-[16px]', textColor)}>No tasks found</p>
                <p className={cn('text-[14px]', mutedColor)}>
                  Try adjusting your filters or create a new task
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* New Task Modal */}
        <Modal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
          title="Create New Task"
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Task Title"
              placeholder="Enter task title..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />

            <Textarea
              label="Description"
              placeholder="Enter task description..."
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              rows={3}
            />

            <Input
              label="Due Date"
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />

            <div>
              <label className={cn('block text-[15px] font-medium mb-2', textColor)}>
                Priority
              </label>
              <div className="glass-card p-1 flex gap-1">
                <Button
                  variant={newTask.priority === 'low' ? 'primary' : 'ghost'}
                  onClick={() => setNewTask({ ...newTask, priority: 'low' })}
                  className="flex-1"
                >
                  Low
                </Button>
                <Button
                  variant={newTask.priority === 'medium' ? 'primary' : 'ghost'}
                  onClick={() => setNewTask({ ...newTask, priority: 'medium' })}
                  className="flex-1"
                >
                  Medium
                </Button>
                <Button
                  variant={newTask.priority === 'high' ? 'primary' : 'ghost'}
                  onClick={() => setNewTask({ ...newTask, priority: 'high' })}
                  className="flex-1"
                >
                  High
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsNewTaskModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateTask}>
                Create Task
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </PageWrapper>
  );
};

export default TasksPage;
