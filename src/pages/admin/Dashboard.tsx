import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Calendar, MessageSquare, Users, TrendingUp, TrendingDown } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import StatCard from '../../components/dashboard/StatCard';
import SentimentChart from '../../components/analytics/SentimentChart';
import TimelineChart from '../../components/analytics/TimelineChart';
import { useAuth } from '../../contexts/AuthContext';

interface SentimentData {
  name: string;
  value: number;
  color: string;
}

interface TimelineData {
  date: string;
  sentiment: number;
}

interface RecentFeedback {
  id: string;
  eventName: string;
  date: string;
  feedback: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [recentFeedback, setRecentFeedback] = useState<RecentFeedback[]>([]);

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

    // Mock data for recent feedback
    const mockRecentFeedback: RecentFeedback[] = [
      {
        id: '1',
        eventName: 'Music Festival',
        date: '2025-04-21',
        feedback: 'Great event!',
        sentiment: 'Positive',
      },
      {
        id: '2',
        eventName: 'Science Fair',
        date: '2025-04-26',
        feedback: 'The event was okay.',
        sentiment: 'Neutral',
      },
      {
        id: '3',
        eventName: 'Career Expo',
        date: '2025-05-11',
        feedback: 'Amazing experience, well organized.',
        sentiment: 'Positive',
      },
      {
        id: '4',
        eventName: 'Cultural Festival',
        date: '2025-05-16',
        feedback: 'Not satisfied with the event.',
        sentiment: 'Negative',
      },
    ];
    setRecentFeedback(mockRecentFeedback);
  }, []);

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
      <div className="mt-6 md:mt-10 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user?.name}</h1>
          <p className="mt-1 text-gray-600">
            Here's an overview of the feedback system
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Feedback"
            value="358"
            icon={<MessageSquare className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Average Rating"
            value="4.2"
            icon={<BarChart2 className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Participation Rate"
            value="78%"
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Upcoming Events"
            value="6"
            icon={<Calendar className="h-6 w-6" />}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
              <h2 className="text-lg font-medium text-gray-900">Sentiment Trends</h2>
              <div className="mt-4">
                <TimelineChart data={timelineData} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Recent Feedback</h2>
            <Link
              to="/admin/feedback"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all
            </Link>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-x-auto">
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

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Positive Trends</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Music Festival received 80% positive feedback</li>
                      <li>Overall sentiment improved by 12% this month</li>
                      <li>Career Expo had the highest participation rate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Areas for Improvement</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Cultural Festival received 20% negative feedback</li>
                      <li>Science Fair participation rate decreased by 5%</li>
                      <li>Food quality mentioned as an issue in multiple events</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;