import React, { useState, useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import StudentLayout from '../../components/layouts/StudentLayout';
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

const StudentFeedbackAnalysis: React.FC = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('All Events');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Last 30 days');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('All Sentiments');

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
  }, []);

  const handleFilterApply = () => {
    // Filter logic would go here
    console.log('Filters applied:', {
      event: selectedEvent,
      dateRange: selectedDateRange,
      sentiment: selectedSentiment
    });
  };

  return (
    <StudentLayout>
      <div className="mt-6 md:mt-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
            <BarChart2 className="mr-2 h-6 w-6 text-primary-600" />
            Your Feedback Analysis
          </h1>
          <p className="mt-1 text-gray-600">
            View insights from your feedback submissions
          </p>
        </div>

        {/* fit  here  the ui code  */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Event Dropdown */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Event</label>
                <select 
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option>All Events</option>
                  <option>Music Festival</option>
                  <option>Science Fair</option>
                  <option>Hackathon</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Date Range</label>
                <select 
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>

              {/* Sentiment Dropdown */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Sentiment</label>
                <select 
                  value={selectedSentiment}
                  onChange={(e) => setSelectedSentiment(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option>All Sentiments</option>
                  <option>Positive</option>
                  <option>Neutral</option>
                  <option>Negative</option>
                </select>
              </div>

              {/* Apply Button */}
              <div className="flex items-end">
                <button 
                  onClick={handleFilterApply}
                  className="w-full px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 transition text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Rest of your existing code remains unchanged */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Your Sentiment Distribution</h2>
              <div className="mt-4">
                <SentimentChart data={sentimentData} />
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Your Sentiment Trends</h2>
              <div className="mt-4">
                <TimelineChart data={timelineData} />
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your existing code remains unchanged */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Feedback Statistics</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Total Feedback Count</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">324</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">4.2</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Most Common Sentiment</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">Positive</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Participation Rate</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">78%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Feedback</h2>
              <button className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 transition text-sm">
                Export Data
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { text: "Great event!", sentiment: "Positive" },
                { text: "The event was okay.", sentiment: "Neutral" },
                { text: "Amazing experience, well organized.", sentiment: "Positive" },
                { text: "Not satisfied with the event.", sentiment: "Neutral" },
              ].map((feedback, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                  <p className="text-gray-800 mb-2">{feedback.text}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    feedback.sentiment === "Positive" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {feedback.sentiment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentFeedbackAnalysis;