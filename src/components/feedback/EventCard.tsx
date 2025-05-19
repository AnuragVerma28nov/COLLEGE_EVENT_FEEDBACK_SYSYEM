import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  feedbackLink?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  date,
  description,
  location,
  imageUrl,
  feedbackLink = false,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all hover:shadow-md">
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
        
        {location && (
          <p className="mt-1 text-sm text-gray-500">
            {location}
          </p>
        )}
        
        {description && (
          <p className="mt-3 text-sm text-gray-600">
            {description.length > 120 ? description.substring(0, 120) + '...' : description}
          </p>
        )}
        
        {feedbackLink && (
          <div className="mt-4">
            <Link
              to={`/student/submit-feedback?eventId=${id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Give Feedback
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;