import React, { useState, useEffect } from 'react';
import { BarChart2, Calendar, Download } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import SentimentChart from '../../components/analytics/SentimentChart';
import TimelineChart from '../../components/analytics/TimelineChart';

interface SentimentData {
  name: string;
  value: number;
  color: string;
}

interface TimelineData {
  date: string;
  sentiment: number;
}

interface EventSentiment {
  eventId: string;
  eventName: string;
  positive: number;
  neutral: number;
  negative: number;
  averageRating: number;
  totalFeedback: number;
}

interface FeedbackItem {
  id: string;
  eventId: string;
  eventName: string;
  date: string;
  feedback: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentimentScore: number;
}

const FeedbackAnalysis: React.FC = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [eventSentiments, setEventSentiments] = useState<EventSentiment[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [recentFeedback, setRecentFeedback] = useState<FeedbackItem[]>([]);
  const [events, setEvents] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
    // Mock data for sentiment distribution
    const mockSentimentData: SentimentData[] = [
      { name: 'Positive', value: 65, color: '#3b82f6' },
      { name: 'Neutral', value: 20, color: '#fbbf24' },
      { name: 'Negative', value: 15, color: '#ef4444' },
    ];
    setSentimentData(mockSentimentData);

    // Mock data for timeline
    const mockTimelineData: TimelineData[] = [
      { date: '2025-01', sentiment: 0.65 },
      { date: '2025-02', sentiment: 0.70 },
      { date: '2025-03', sentiment: 0.68 },
      { date: '2025-04', sentiment: 0.75 },
      { date: '2025-05', sentiment: 0.82 },
      { date: '2025-06', sentiment: 0.78 },
    ];
    setTimelineData(mockTimelineData);

    // Mock data for event sentiments
    const mockEventSentiments: EventSentiment[] = [
      {
        eventId: '1',
        eventName: 'Music Festival',
        positive: 80,
        neutral: 15,
        negative: 5,
        averageRating: 4.5,
        totalFeedback: 120,
      },
      {
        eventId: '2',
        eventName: 'Science Fair',
        positive: 60,
        neutral: 25,
        negative: 15,
        averageRating: 4.0,
        totalFeedback: 85,
      },
      {
        eventId: '3',
        eventName: 'Career Expo',
        positive: 75,
        neutral: 20,
        negative: 5,
        averageRating: 4.3,
        totalFeedback: 95,
      },
      {
        eventId: '4',
        eventName: 'Cultural Festival',
        positive: 50,
        neutral: 30,
        negative: 20,
        averageRating: 3.8,
        totalFeedback: 110,
      },
    ];
    setEventSentiments(mockEventSentiments);
    
    // Extract events for filter
    const eventsList = mockEventSentiments.map(item => ({
      id: item.eventId,
      name: item.eventName,
    }));
    setEvents(eventsList);

    // Mock data for recent feedback
    const mockRecentFeedback: FeedbackItem[] = [
      {
        id: '1',
        eventId: '1',
        eventName: 'Music Festival',
        date: '2025-04-21',
        feedback: 'Great event!',
        sentiment: 'Positive',
        sentimentScore: 0.85,
      },
      {
        id: '2',
        eventId: '2',
        eventName: 'Science Fair',
        date: '2025-04-26',
        feedback: 'The event was okay.',
        sentiment: 'Neutral',
        sentimentScore: 0.50,
      },
      {
        id: '3',
        eventId: '3',
        eventName: 'Career Expo',
        date: '2025-05-11',
        feedback: 'Amazing experience, well organized.',
        sentiment: 'Positive',
        sentimentScore: 0.90,
      },
      {
        id: '4',
        eventId: '4',
        eventName: 'Cultural Festival',
        date: '2025-05-16',
        feedback: 'Not satisfied with the event.',
        sentiment: 'Negative',
        sentimentScore: 0.25,
      },
    ];
    setRecentFeedback(mockRecentFeedback);
  }, []);

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEvent(e.target.value);
    // In a real app, this would filter the data based on the selected event
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDateRange(e.target.value);
    // In a real app, this would filter the data based on the selected date range
  };

  const handleExport = () => {
    // In a real app, this would generate a report
    alert('Exporting analysis report...');
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
    <AdminLayout>
      <div className="mt-6 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <BarChart2 className="mr-2 h-6 w-6 text-primary-600" />
              Feedback Analysis
            </h1>
            <p className="mt-1 text-gray-600">
              Analyze sentiment trends and feedback patterns
            </p>
          </div>
          <button
            onClick={handleExport}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Download className="mr-2 -ml-1 h-5 w-5" />
            Export Report
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Sentiment Distribution</h2>
              <div className="mt-4">
                <SentimentChart data={sentimentData} />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Sentiment Trends Over Time</h2>
              <div className="mt-4">
                <TimelineChart data={timelineData} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-medium text-gray-900">Event Comparison</h2>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <select
                  className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedEvent}
                  onChange={handleEventChange}
                >
                  <option value="all">All Events</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
                <select
                  className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedDateRange}
                  onChange={handleDateRangeChange}
                >
                  <option value="all">All Time</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
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
                      Positive
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Neutral
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Negative
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avg. Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Feedback
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventSentiments.map((event) => (
                    <tr key={event.eventId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {event.eventName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.positive}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.neutral}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.negative}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.averageRating.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.totalFeedback}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Feedback</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Feedback
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Event
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
                  {recentFeedback.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.feedback}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.eventName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSentimentBadge(item.sentiment)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FeedbackAnalysis;