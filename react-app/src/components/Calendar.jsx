import { useState, useMemo } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import './Calendar.css';

const localizer = momentLocalizer(moment);

/**
 * Calendar component with glassmorphic styling
 *
 * @param {Object} props
 * @param {Array} props.events - Array of calendar events
 * @param {Function} props.onSelectEvent - Handler for event click
 * @param {Function} props.onSelectSlot - Handler for slot selection
 * @param {string} props.defaultView - Default calendar view (month, week, day, agenda)
 * @param {Date} props.defaultDate - Default date to show
 */
const Calendar = ({
  events = [],
  onSelectEvent,
  onSelectSlot,
  defaultView = 'month',
  defaultDate = new Date(),
  ...props
}) => {
  const { isDark } = useTheme();
  const [view, setView] = useState(defaultView);
  const [date, setDate] = useState(defaultDate);

  // Event style getter for glassmorphic look
  const eventStyleGetter = (event) => {
    const baseStyle = {
      backgroundColor: event.color || '#3a6df0',
      borderRadius: '8px',
      opacity: 0.9,
      color: 'white',
      border: 'none',
      display: 'block',
      padding: '4px 8px',
      fontSize: '13px',
      fontWeight: '500',
    };

    return {
      style: baseStyle,
    };
  };

  // Custom day prop getter for glassmorphic styling
  const dayPropGetter = (date) => {
    const today = moment().startOf('day');
    const currentDate = moment(date).startOf('day');

    if (currentDate.isSame(today)) {
      return {
        className: 'rbc-today-custom',
      };
    }
    return {};
  };

  const { components } = useMemo(
    () => ({
      components: {
        event: ({ event }) => (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="truncate">{event.title}</span>
          </div>
        ),
      },
    }),
    []
  );

  return (
    <div className={cn('calendar-wrapper', isDark ? 'dark-theme' : 'light-theme')}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        components={components}
        {...props}
      />
    </div>
  );
};

export default Calendar;
