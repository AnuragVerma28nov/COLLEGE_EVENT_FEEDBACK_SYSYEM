import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Calendar, Clock, ChevronRight } from 'lucide-react';
import StudentLayout from '../../components/layouts/StudentLayout';
import EventList from '../../components/common/EventList';
import { useAuth } from '../../contexts/AuthContext';

interface FeedbackItem {
  id: string;
  eventName: string;
  date: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

interface Event {
  id: string;
  name: string;
  date: string;
  description?: string;
  location?: string;
  imageUrl?: string;
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    // Mock data for upcoming events
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
        name: 'Career Workshop',
        date: '2025-04-28',
        description: 'Learn how to prepare for job interviews and build your resume.',
        location: 'Career Center',
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      },
    ];

    setUpcomingEvents(mockEvents);

    // Mock data for recent feedback
    const mockFeedback: FeedbackItem[] = [
      {
        id: '1',
        eventName: 'Art Exhibition',
        date: '2025-03-05',
        sentiment: 'Positive',
      },
      {
        id: '2',
        eventName: 'Tech Talk',
        date: '2025-03-12',
        sentiment: 'Neutral',
      },
      {
        id: '3',
        eventName: 'Charity Run',
        date: '2025-03-18',
        sentiment: 'Negative',
      },
    ];
    setRecentFeedback(mockFeedback);
  }, []);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Positive
          </span>
        );
      case 'Negative':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Negative
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Neutral
          </span>
        );
    }
  };

  return (
    <StudentLayout>
      <div className="mt-6 md:mt-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user?.name}</h1>
          <Link
            to="/student/submit-feedback"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FileText className="mr-2 -ml-1 h-5 w-5" />
            Give Feedback
          </Link>
        </div>

        <section className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary-500" />
              Completed Events
            </h2>
            <Link
              to="/student/Events"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
            >
              View all events
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <EventList events={upcomingEvents} showFeedbackLink={true} />
          </div>
        </section>

        <section className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary-500" />
              Feedback History
            </h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {recentFeedback.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Event Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sentiment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentFeedback.map((feedback) => (
                      <tr key={feedback.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {feedback.eventName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(feedback.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getSentimentBadge(feedback.sentiment)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No feedback history found</p>
              </div>
            )}
            {recentFeedback.length > 0 && (
              <div className="mt-4 flex justify-end">
                <Link
                  to="/student/feedback-history"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
                >
                  View all feedback
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;