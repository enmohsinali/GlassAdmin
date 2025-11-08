import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PageWrapper from '../components/PageWrapper';
import { Card, Button, Badge, Avatar, Modal, Input, Textarea, Select } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { Plus, List, LayoutGrid, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';

// Task Card Component
const TaskCard = ({ task, isDragging = false }) => {
  const { isDark } = useTheme();
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const priorityColors = {
    low: 'bg-success/10 text-success',
    medium: 'bg-warning/10 text-warning',
    high: 'bg-danger/10 text-danger',
  };

  return (
    <div
      className={cn(
        'glass-card p-4 cursor-grab active:cursor-grabbing transition-all',
        isDragging && 'opacity-50 scale-95'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className={cn('text-[15px] font-semibold flex-1', textColor)}>{task.title}</h4>
        <Badge className={priorityColors[task.priority]} variant="default">
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className={cn('text-[13px] mb-3 line-clamp-2', mutedColor)}>{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {task.assignee && (
            <Avatar src={task.assignee.avatar} alt={task.assignee.name} size="sm" />
          )}
          {task.dueDate && (
            <div className={cn('flex items-center gap-1 text-[12px]', mutedColor)}>
              <Calendar className="w-3 h-3" />
              {task.dueDate}
            </div>
          )}
        </div>
        {task.subtasks && (
          <div className={cn('text-[12px]', mutedColor)}>
            <CheckCircle className="w-3 h-3 inline mr-1" />
            {task.subtasks.completed}/{task.subtasks.total}
          </div>
        )}
      </div>
    </div>
  );
};

// Sortable Task Card
const SortableTaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} isDragging={isDragging} />
    </div>
  );
};

// Column Component for Trello view
const Column = ({ column, tasks }) => {
  const { isDark } = useTheme();
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const statusColors = {
    todo: 'rgb(var(--color-primary))',
    'in-progress': 'rgb(var(--color-warning))',
    review: 'rgb(var(--color-purple))',
    done: 'rgb(var(--color-success))',
  };

  return (
    <div className="flex-shrink-0 w-[300px]">
      <div className="glass-card p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: statusColors[column.id] }}
            />
            <h3 className={cn('text-[16px] font-semibold', textColor)}>{column.title}</h3>
            <Badge variant="default">{tasks.length}</Badge>
          </div>
        </div>

        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 min-h-[200px]">
            {tasks.map((task) => (
              <SortableTaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

// List View Component
const ListView = ({ tasks, onTaskClick }) => {
  const { isDark } = useTheme();
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const borderColor = isDark ? 'border-[rgba(249,250,251,0.1)]' : 'border-[rgba(0,0,0,0.1)]';

  const priorityColors = {
    low: 'bg-success/10 text-success',
    medium: 'bg-warning/10 text-warning',
    high: 'bg-danger/10 text-danger',
  };

  const statusColors = {
    todo: 'bg-primary/10 text-primary',
    'in-progress': 'bg-warning/10 text-warning',
    review: 'bg-purple/10 text-purple',
    done: 'bg-success/10 text-success',
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={cn('border-b', borderColor)}>
              <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                Task
              </th>
              <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                Status
              </th>
              <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                Priority
              </th>
              <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                Assignee
              </th>
              <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                Due Date
              </th>
              <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                Progress
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={cn(
                  'border-b transition-all cursor-pointer hover:bg-primary/5',
                  borderColor
                )}
                onClick={() => onTaskClick(task)}
              >
                <td className={cn('py-3 px-4', textColor)}>
                  <div>
                    <div className="text-[14px] font-medium">{task.title}</div>
                    {task.description && (
                      <div className={cn('text-[12px] line-clamp-1', mutedColor)}>
                        {task.description}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge className={statusColors[task.status]} variant="default">
                    {task.status.replace('-', ' ')}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge className={priorityColors[task.priority]} variant="default">
                    {task.priority}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  {task.assignee && (
                    <div className="flex items-center gap-2">
                      <Avatar src={task.assignee.avatar} alt={task.assignee.name} size="sm" />
                      <span className={cn('text-[13px]', textColor)}>{task.assignee.name}</span>
                    </div>
                  )}
                </td>
                <td className={cn('py-3 px-4 text-[13px]', mutedColor)}>{task.dueDate || '-'}</td>
                <td className="py-3 px-4">
                  {task.subtasks && (
                    <div className={cn('text-[13px]', mutedColor)}>
                      {task.subtasks.completed}/{task.subtasks.total}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const ScrumBoardPage = () => {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create mockups for the new product landing page with modern design',
      status: 'todo',
      priority: 'high',
      assignee: { name: 'Sarah Wilson', avatar: 'https://i.pravatar.cc/150?img=1' },
      dueDate: 'Nov 10',
      subtasks: { completed: 2, total: 5 },
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Add JWT authentication to the API endpoints',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
      dueDate: 'Nov 8',
      subtasks: { completed: 3, total: 4 },
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all REST API endpoints with examples',
      status: 'in-progress',
      priority: 'medium',
      assignee: { name: 'Mike Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
      dueDate: 'Nov 12',
      subtasks: { completed: 5, total: 8 },
    },
    {
      id: '4',
      title: 'Fix mobile responsive issues',
      description: 'Resolve layout problems on mobile devices',
      status: 'review',
      priority: 'high',
      assignee: { name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=4' },
      dueDate: 'Nov 9',
      subtasks: { completed: 4, total: 4 },
    },
    {
      id: '5',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      status: 'done',
      priority: 'medium',
      assignee: { name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=5' },
      dueDate: 'Nov 5',
      subtasks: { completed: 6, total: 6 },
    },
    {
      id: '6',
      title: 'Update user dashboard',
      description: 'Refresh dashboard UI with new components',
      status: 'todo',
      priority: 'low',
      assignee: { name: 'Lisa Johnson', avatar: 'https://i.pravatar.cc/150?img=6' },
      dueDate: 'Nov 15',
      subtasks: { completed: 0, total: 3 },
    },
  ]);

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (activeTask && overTask && activeTask.status === overTask.status) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overColumn = columns.find((c) =>
      tasks.filter((t) => t.status === c.id).some((t) => t.id === over.id)
    );

    if (activeTask && overColumn && activeTask.status !== overColumn.id) {
      setTasks((tasks) =>
        tasks.map((t) => (t.id === active.id ? { ...t, status: overColumn.id } : t))
      );
    }
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <PageWrapper title="Scrum Board">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-[28px] font-bold mb-2', textColor)}>Scrum Board</h1>
            <p className={cn('text-[15px]', mutedColor)}>
              Manage your tasks with drag & drop
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-card p-1 flex gap-1">
              <Button
                variant={viewMode === 'board' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('board')}
                leftIcon={<LayoutGrid className="w-4 h-4" />}
              >
                Board
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                leftIcon={<List className="w-4 h-4" />}
              >
                List
              </Button>
            </div>
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              New Task
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Total Tasks</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{tasks.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-warning/10">
                <AlertCircle className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>In Progress</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {tasks.filter((t) => t.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple/10">
                <AlertCircle className="w-6 h-6 text-purple" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>In Review</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {tasks.filter((t) => t.status === 'review').length}
                </p>
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
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {tasks.filter((t) => t.status === 'done').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Board or List View */}
        {viewMode === 'board' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="flex gap-4 overflow-x-auto pb-4">
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((t) => t.status === column.id)}
                />
              ))}
            </div>

            <DragOverlay>
              {activeTask && <TaskCard task={activeTask} isDragging />}
            </DragOverlay>
          </DndContext>
        ) : (
          <ListView tasks={tasks} onTaskClick={handleTaskClick} />
        )}

        {/* Task Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Task Details"
          size="md"
        >
          {selectedTask && (
            <div className="space-y-4">
              <div>
                <h3 className={cn('text-[18px] font-semibold mb-2', textColor)}>
                  {selectedTask.title}
                </h3>
                <p className={cn('text-[14px]', mutedColor)}>{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={cn('text-[13px] font-medium mb-1', mutedColor)}>Status</p>
                  <Badge variant="default">{selectedTask.status.replace('-', ' ')}</Badge>
                </div>
                <div>
                  <p className={cn('text-[13px] font-medium mb-1', mutedColor)}>Priority</p>
                  <Badge variant="default">{selectedTask.priority}</Badge>
                </div>
              </div>

              {selectedTask.assignee && (
                <div>
                  <p className={cn('text-[13px] font-medium mb-2', mutedColor)}>Assignee</p>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={selectedTask.assignee.avatar}
                      alt={selectedTask.assignee.name}
                      size="md"
                    />
                    <span className={cn('text-[14px]', textColor)}>
                      {selectedTask.assignee.name}
                    </span>
                  </div>
                </div>
              )}

              {selectedTask.dueDate && (
                <div>
                  <p className={cn('text-[13px] font-medium mb-1', mutedColor)}>Due Date</p>
                  <div className={cn('flex items-center gap-2 text-[14px]', textColor)}>
                    <Calendar className="w-4 h-4" />
                    {selectedTask.dueDate}
                  </div>
                </div>
              )}

              {selectedTask.subtasks && (
                <div>
                  <p className={cn('text-[13px] font-medium mb-1', mutedColor)}>Progress</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-[rgba(0,0,0,0.1)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${
                            (selectedTask.subtasks.completed / selectedTask.subtasks.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className={cn('text-[13px]', mutedColor)}>
                      {selectedTask.subtasks.completed}/{selectedTask.subtasks.total}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button variant="primary">Edit Task</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageWrapper>
  );
};

export default ScrumBoardPage;
