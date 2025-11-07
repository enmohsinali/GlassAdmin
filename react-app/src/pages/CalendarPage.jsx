import { useState } from 'react';
import moment from 'moment';
import PageWrapper from '../components/PageWrapper';
import Calendar from '../components/Calendar';
import { GlassCard, Modal, Input, Textarea, Button, Badge } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { Plus, Clock, MapPin, Users } from 'lucide-react';

const CalendarPage = () => {
  const { isDark } = useTheme();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(2025, 10, 7, 10, 0),
      end: new Date(2025, 10, 7, 11, 0),
      color: '#3a6df0',
      description: 'Weekly team sync-up meeting',
      location: 'Conference Room A',
      attendees: ['John Doe', 'Jane Smith', 'Bob Johnson'],
    },
    {
      id: 2,
      title: 'Project Review',
      start: new Date(2025, 10, 8, 14, 0),
      end: new Date(2025, 10, 8, 15, 30),
      color: '#3bf083',
      description: 'Q4 project milestone review',
      location: 'Virtual',
      attendees: ['Sarah Wilson', 'Mike Brown'],
    },
    {
      id: 3,
      title: 'Client Presentation',
      start: new Date(2025, 10, 10, 13, 0),
      end: new Date(2025, 10, 10, 14, 0),
      color: '#ff705c',
      description: 'Product demo for new client',
      location: 'Zoom',
      attendees: ['Emily Davis', 'Alex Turner'],
    },
    {
      id: 4,
      title: 'Design Workshop',
      start: new Date(2025, 10, 12, 9, 0),
      end: new Date(2025, 10, 12, 12, 0),
      color: '#9333ea',
      description: 'UI/UX design brainstorming session',
      location: 'Design Studio',
      attendees: ['Creative Team'],
    },
    {
      id: 5,
      title: 'Lunch Break',
      start: new Date(2025, 10, 7, 12, 0),
      end: new Date(2025, 10, 7, 13, 0),
      color: '#ffbd2e',
      description: 'Team lunch',
      location: 'Cafeteria',
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: null,
    end: null,
    location: '',
  });

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setNewEvent({
      title: '',
      description: '',
      start: slotInfo.start,
      end: slotInfo.end,
      location: '',
    });
    setIsNewEventModalOpen(true);
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const event = {
        id: events.length + 1,
        ...newEvent,
        color: '#3a6df0',
        attendees: [],
      };
      setEvents([...events, event]);
      setIsNewEventModalOpen(false);
      setNewEvent({ title: '', description: '', start: null, end: null, location: '' });
    }
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <PageWrapper title="Calendar">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-[28px] font-bold mb-2', textColor)}>Calendar</h1>
            <p className={cn('text-[15px]', mutedColor)}>
              Manage your schedule and events
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => handleSelectSlot({ start: new Date(), end: new Date() })}
          >
            New Event
          </Button>
        </div>

        {/* Calendar Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[rgba(58,109,240,0.1)]">
                <Clock className="w-6 h-6 text-[#3a6df0]" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Total Events</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{events.length}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[rgba(59,240,131,0.1)]">
                <MapPin className="w-6 h-6 text-[#3bf083]" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>This Week</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {events.filter((e) => moment(e.start).isSame(new Date(), 'week')).length}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[rgba(255,112,92,0.1)]">
                <Users className="w-6 h-6 text-[#ff705c]" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>This Month</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {events.filter((e) => moment(e.start).isSame(new Date(), 'month')).length}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[rgba(255,189,46,0.1)]">
                <Clock className="w-6 h-6 text-[#ffbd2e]" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Today</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {events.filter((e) => moment(e.start).isSame(new Date(), 'day')).length}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Calendar */}
        <GlassCard>
          <Calendar
            events={events}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            defaultView="month"
            defaultDate={new Date()}
          />
        </GlassCard>

        {/* Event Details Modal */}
        <Modal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          title="Event Details"
          size="md"
        >
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className={cn('text-[20px] font-semibold mb-2', textColor)}>
                  {selectedEvent.title}
                </h3>
                <Badge
                  variant="default"
                  style={{ backgroundColor: selectedEvent.color }}
                  className="mb-3"
                >
                  Event
                </Badge>
              </div>

              {selectedEvent.description && (
                <div>
                  <p className={cn('text-[14px] font-medium mb-1', textColor)}>Description</p>
                  <p className={cn('text-[14px]', mutedColor)}>{selectedEvent.description}</p>
                </div>
              )}

              <div>
                <p className={cn('text-[14px] font-medium mb-1', textColor)}>
                  <Clock className="w-4 h-4 inline mr-2" />
                  Time
                </p>
                <p className={cn('text-[14px]', mutedColor)}>
                  {moment(selectedEvent.start).format('MMMM D, YYYY h:mm A')} -{' '}
                  {moment(selectedEvent.end).format('h:mm A')}
                </p>
              </div>

              {selectedEvent.location && (
                <div>
                  <p className={cn('text-[14px] font-medium mb-1', textColor)}>
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </p>
                  <p className={cn('text-[14px]', mutedColor)}>{selectedEvent.location}</p>
                </div>
              )}

              {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                <div>
                  <p className={cn('text-[14px] font-medium mb-2', textColor)}>
                    <Users className="w-4 h-4 inline mr-2" />
                    Attendees ({selectedEvent.attendees.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.attendees.map((attendee, index) => (
                      <Badge key={index} variant="default">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsEventModalOpen(false)}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleDeleteEvent}>
                  Delete Event
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* New Event Modal */}
        <Modal
          isOpen={isNewEventModalOpen}
          onClose={() => setIsNewEventModalOpen(false)}
          title="Create New Event"
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Event Title"
              placeholder="Enter event title..."
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />

            <Textarea
              label="Description"
              placeholder="Enter event description..."
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              rows={3}
            />

            <Input
              label="Location"
              placeholder="Enter location..."
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={cn('block text-[15px] font-medium mb-2', textColor)}>
                  Start Time
                </label>
                <p className={cn('text-[14px]', mutedColor)}>
                  {newEvent.start && moment(newEvent.start).format('MMM D, YYYY h:mm A')}
                </p>
              </div>
              <div>
                <label className={cn('block text-[15px] font-medium mb-2', textColor)}>
                  End Time
                </label>
                <p className={cn('text-[14px]', mutedColor)}>
                  {newEvent.end && moment(newEvent.end).format('MMM D, YYYY h:mm A')}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsNewEventModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateEvent}>
                Create Event
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </PageWrapper>
  );
};

export default CalendarPage;
