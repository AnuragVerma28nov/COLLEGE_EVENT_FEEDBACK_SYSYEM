import React, { useState, useEffect } from 'react';
import StudentLayout from '../../components/layouts/StudentLayout';
import FeedbackCard from '../../components/feedback/FeedbackCard';
import { History, Search } from 'lucide-react';

interface FeedbackItem {
  id: string;
  eventName: string;
  date: string;
  rating: number;
  feedback: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

const FeedbackHistory: React.FC = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FeedbackItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for feedback history
    const mockFeedback: FeedbackItem[] = [
      {
        id: '1',
        eventName: 'Art Exhibition',
        date: '2025-03-05',
        rating: 5,
        feedback: 'The art exhibition was amazing! I loved seeing all the creative works from fellow students.',
        sentiment: 'Positive',
      },
      {
        id: '2',
        eventName: 'Tech Talk',
        date: '2025-03-12',
        rating: 3,
        feedback: 'The tech talk was okay. The speaker was knowledgeable but the presentation was a bit dry.',
        sentiment: 'Neutral',
      },
      {
        id: '3',
        eventName: 'Charity Run',
        date: '2025-03-18',
        rating: 2,
        feedback: 'The charity run was poorly organized. There was confusion about the route and not enough water stations.',
        sentiment: 'Negative',
      },
      {
        id: '4',
        eventName: 'Poetry Reading',
        date: '2025-03-25',
        rating: 4,
        feedback: 'I enjoyed the poetry reading event. The performers were talented and the atmosphere was great.',
        sentiment: 'Positive',
      },
      {
        id: '5',
        eventName: 'Career Workshop',
        date: '2025-04-02',
        rating: 5,
        feedback: 'The career workshop was extremely helpful. I learned a lot about resume building and interview techniques.',
        sentiment: 'Positive',
      },
    ];
    
    setFeedbackItems(mockFeedback);
    setFilteredItems(mockFeedback);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredItems(feedbackItems);
    } else {
      const filtered = feedbackItems.filter(
        item => 
          item.eventName.toLowerCase().includes(term) || 
          item.feedback.toLowerCase().includes(term)
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <StudentLayout>
      <div className="mt-6 md:mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
              <History className="mr-2 h-6 w-6 text-primary-600" />
              Feedback History
            </h1>
            <p className="mt-1 text-gray-600">
              View your previous feedback submissions
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
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="space-y-4">
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
                <p className="text-gray-500">No feedback history found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default FeedbackHistory;