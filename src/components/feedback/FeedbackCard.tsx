import React from 'react';
import { ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

interface FeedbackCardProps {
  id: string;
  eventName: string;
  date: string;
  rating: number;
  feedback: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  id,
  eventName,
  date,
  rating,
  feedback,
  sentiment,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getSentimentBadge = () => {
    switch (sentiment) {
      case 'Positive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <ThumbsUp className="mr-1 h-4 w-4" />
            Positive
          </span>
        );
      case 'Negative':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ThumbsDown className="mr-1 h-4 w-4" />
            Negative
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Meh className="mr-1 h-4 w-4" />
            Neutral
          </span>
        );
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4 hover:shadow-md transition-shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{eventName}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex">{renderStars()}</div>
          {getSentimentBadge()}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;