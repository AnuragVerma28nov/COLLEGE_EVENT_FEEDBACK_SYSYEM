import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Calendar, Plus, Search, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';

interface Event {
  id: string;
  name: string;
  date: string;
  description?: string;
  location?: string;
  imageUrl?: string;
}

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    location: '',
    imageUrl: '',
  });

  useEffect(() => {
    // Mock data for events
    const mockEvents: Event[] = [
      {
        id: '1',
        name: 'Music Festival',
        date: '2025-04-20',
        description: 'Annual college music festival featuring student performances.',
        location: 'Main Auditorium',
        imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      },
      {
        id: '2',
        name: 'Science Fair',
        date: '2025-04-25',
        description: 'Showcase your innovative science projects and compete for prizes.',
        location: 'Science Building',
        imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      },
      {
        id: '3',
        name: 'Career Expo',
        date: '2025-05-10',
        description: 'Connect with potential employers and explore career opportunities.',
        location: 'Student Center',
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      },
      {
        id: '4',
        name: 'Cultural Festival',
        date: '2025-05-15',
        description: 'Celebrate diversity with performances, food, and activities from different cultures.',
        location: 'Campus Quad',
        imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
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

  const openModal = (event: Event | null = null) => {
    if (event) {
      setCurrentEvent(event);
      setFormData({
        name: event.name,
        date: event.date,
        description: event.description || '',
        location: event.location || '',
        imageUrl: event.imageUrl || '',
      });
    } else {
      setCurrentEvent(null);
      setFormData({
        name: '',
        date: '',
        description: '',
        location: '',
        imageUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.date) {
      toast.error('Name and date are required');
      return;
    }

    if (currentEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === currentEvent.id 
          ? { ...event, ...formData } 
          : event
      );
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      toast.success('Event updated successfully');
    } else {
      // Add new event
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
      };
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      toast.success('Event added successfully');
    }
    
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      setFilteredEvents(updatedEvents);
      toast.success('Event deleted successfully');
    }
  };

  return (
    <AdminLayout>
      <div className="mt-6 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-primary-600" />
              Event Management
            </h1>
            <p className="mt-1 text-gray-600">
              Create and manage college events
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="mr-2 -ml-1 h-5 w-5" />
            Add Event
          </button>
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
            <ul className="divide-y divide-gray-200">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <li key={event.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {event.imageUrl && (
                            <div className="flex-shrink-0 h-12 w-12 mr-3">
                              <img
                                className="h-12 w-12 rounded-md object-cover"
                                src={event.imageUrl}
                                alt={event.name}
                              />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-primary-600 truncate">{event.name}</p>
                            <p className="flex items-center text-sm text-gray-500">
                              <span className="truncate">{new Date(event.date).toLocaleDateString()}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal(event)}
                            className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {event.description && (
                        <div className="mt-2 text-sm text-gray-700">
                          {event.description.length > 100 
                            ? `${event.description.substring(0, 100)}...` 
                            : event.description}
                        </div>
                      )}
                      {event.location && (
                        <div className="mt-1 text-sm text-gray-500">
                          Location: {event.location}
                        </div>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-5 text-center text-gray-500">
                  No events found matching your search criteria
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for adding/editing events */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {currentEvent ? 'Edit Event' : 'Add New Event'}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Event Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date *
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            value={formData.date}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                            Image URL
                          </label>
                          <input
                            type="url"
                            name="imageUrl"
                            id="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentEvent ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminEvents;