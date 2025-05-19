import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import EventList from '../../components/common/EventList';
import { Calendar, Search } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  description?: string;
  location?: string;
  imageUrl?: string;
}

const StudentEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for events
    const mockEvents: Event[] = [
      {
        id: '1',
        name: 'Music Festival',
        date: '2025-05-21',
        description: 'Annual college music festival featuring student performances.',
        location: 'Main Auditorium',
        imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      },
      {
        id: '2',
        name: 'Science Fair',
        date: '2025-05-28',
        description: 'Showcase your innovative science projects and compete for prizes.',
        location: 'Science Building',
        imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      },
      {
        id: '3',
        name: 'Career Expo',
        date: '2025-06-10',
        description: 'Connect with potential employers and explore career opportunities.',
        location: 'Student Center',
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      },
      {
        id: '4',
        name: 'Cultural Festival',
        date: '2025-06-15',
        description: 'Celebrate diversity with performances, food, and activities from different cultures.',
        location: 'Campus Quad',
        imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
      },
      {
        id: '5',
        name: 'Sports Tournament',
        date: '2025-06-22',
        description: 'Compete in various sports events and show your athletic skills.',
        location: 'Sports Complex',
        imageUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
      },
      {
        id: '6',
        name: 'Hackathon',
        date: '2025-07-06',
        description: '24-hour coding competition to solve real-world problems.',
        location: 'Computer Science Building',
        imageUrl: 'https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg',
      },
    ];
    
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        event => 
          event.name.toLowerCase().includes(term) || 
          (event.description && event.description.toLowerCase().includes(term)) ||
          (event.location && event.location.toLowerCase().includes(term))
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <StudentLayout>
      <div className="mt-6 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-primary-600" />
              Upcoming Events
            </h1>
            <p className="mt-1 text-gray-600">
              Browse and provide feedback for college events
            </p>
          </div>
        </div>

        <div className="mt-6 relative">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <EventList 
                events={filteredEvents} 
                showFeedbackLink={true} 
                emptyMessage="No events found matching your search criteria"
              />
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentEvents;