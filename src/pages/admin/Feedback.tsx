import React, { useState, useEffect } from 'react';
import { Search, Download } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import FeedbackCard from '../../components/feedback/FeedbackCard';

interface FeedbackItem {
  id: string;
  studentId: string;
  studentName: string;
  eventId: string;
  eventName: string;
  date: string;
  rating: number;
  feedback: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

const AdminFeedback: React.FC = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FeedbackItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');
  const [filterEvent, setFilterEvent] = useState<string>('all');
  const [events, setEvents] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    // Mock data for feedback
    const mockFeedback: FeedbackItem[] = [
      {
        id: '1',
        studentId: 'S001',
        studentName: 'John Doe',
        eventId: '1',
        eventName: 'Music Festival',
        date: '2025-04-21',
        rating: 5,
        feedback: 'The music festival was amazing! Great performances and excellent organization.',
        sentiment: 'Positive',
      },
      {
        id: '2',
        studentId: 'S002',
        studentName: 'Jane Smith',
        eventId: '1',
        eventName: 'Music Festival',
        date: '2025-04-21',
        rating: 4,
        feedback: 'I enjoyed the festival but the sound quality could have been better in some areas.',
        sentiment: 'Positive',
      },
      {
        id: '3',
        studentId: 'S003',
        studentName: 'Mike Johnson',
        eventId: '2',
        eventName: 'Science Fair',
        date: '2025-04-26',
        rating: 3,
        feedback: 'The science fair was okay. Some projects were interesting but overall it was average.',
        sentiment: 'Neutral',
      },
      {
        id: '4',
        studentId: 'S004',
        studentName: 'Sarah Williams',
        eventId: '2',
        eventName: 'Science Fair',
        date: '2025-04-26',
        rating: 2,
        feedback: 'I was disappointed with the science fair. It was poorly organized and the venue was too small.',
        sentiment: 'Negative',
      },
      {
        id: '5',
        studentId: 'S005',
        studentName: 'David Brown',
        eventId: '3',
        eventName: 'Career Expo',
        date: '2025-05-11',
        rating: 5,
        feedback: 'The career expo was extremely helpful. I made great connections with potential employers.',
        sentiment: 'Positive',
      },
      {
        id: '6',
        studentId: 'S006',
        studentName: 'Emily Davis',
        eventId: '4',
        eventName: 'Cultural Festival',
        date: '2025-05-16',
        rating: 4,
        feedback: 'Loved the cultural festival! The food and performances were great.',
        sentiment: 'Positive',
      },
      {
        id: '7',
        studentId: 'S007',
        studentName: 'Alex Wilson',
        eventId: '4',
        eventName: 'Cultural Festival',
        date: '2025-05-16',
        rating: 1,
        feedback: 'The cultural festival was a complete disaster. Long lines, ran out of food, and poor scheduling.',
        sentiment: 'Negative',
      },
    ];
    
    setFeedbackItems(mockFeedback);
    setFilteredItems(mockFeedback);
    
    // Extract unique events
    const uniqueEvents = Array.from(new Set(mockFeedback.map(item => item.eventId)))
      .map(eventId => {
        const event = mockFeedback.find(item => item.eventId === eventId);
        return {
          id: eventId,
          name: event ? event.eventName : '',
        };
      });
    
    setEvents(uniqueEvents);
  }, []);

  const applyFilters = () => {
    let filtered = feedbackItems;
    
    // Apply search term filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        item => 
          item.eventName.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sentiment filter
    if (filterSentiment !== 'all') {
      filtered = filtered.filter(item => item.sentiment === filterSentiment);
    }
    
    // Apply event filter
    if (filterEvent !== 'all') {
      filtered = filtered.filter(item => item.eventId === filterEvent);
    }
    
    setFilteredItems(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterSentiment, filterEvent]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSentimentFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSentiment(e.target.value);
  };

  const handleEventFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterEvent(e.target.value);
  };

  const handleExport = () => {
    // In a real app, this would generate a CSV or Excel file
    alert('Exporting feedback data...');
  };

  return (
    <AdminLayout>
      <div className="mt-6 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Feedback Management</h1>
            <p className="mt-1 text-gray-600">
              View and analyze student feedback for events
            </p>
          </div>
          <button
            onClick={handleExport}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Download className="mr-2 -ml-1 h-5 w-5" />
            Export Data
          </button>
        </div>

        <div className="mt-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Search feedback..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    value={filterSentiment}
                    onChange={handleSentimentFilter}
                  >
                    <option value="all">All Sentiments</option>
                    <option value="Positive">Positive</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>
                <div>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    value={filterEvent}
                    onChange={handleEventFilter}
                  >
                    <option value="all">All Events</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <FeedbackCard
                key={item.id}
                id={item.id}
                eventName={item.eventName}
                date={item.date}
                rating={item.rating}
                feedback={item.feedback}
                sentiment={item.sentiment}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white shadow rounded-lg">
              <p className="text-gray-500">No feedback found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFeedback;