import React from 'react';
import EventCard from '../feedback/EventCard';

interface Event {
  id: string;
  name: string;
  date: string;
  description?: string;
  location?: string;
  imageUrl?: string;
}

interface EventListProps {
  events: Event[];
  showFeedbackLink?: boolean;
  emptyMessage?: string;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  showFeedbackLink = false,
  emptyMessage = 'No events found'
}) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          name={event.name}
          date={event.date}
          description={event.description}
          location={event.location}
          imageUrl={event.imageUrl}
          feedbackLink={showFeedbackLink}
        />
      ))}
    </div>
  );
};

export default EventList;