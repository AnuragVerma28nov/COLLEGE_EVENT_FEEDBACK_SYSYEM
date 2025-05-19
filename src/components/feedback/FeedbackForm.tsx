import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import { toast } from 'react-hot-toast';
import { Smile, Meh, Frown } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => void;
  isLoading?: boolean;
}

export interface FeedbackFormData {
  eventId: string;
  rating: number;
  feedback: string;
  sentimentScore?: number;
  sentimentLabel?: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, isLoading = false }) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FeedbackFormData>();
  const [events, setEvents] = useState<Event[]>([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [sentiment, setSentiment] = useState<{ score: number; label: string } | null>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Mock events data
    const mockEvents = [
      { id: '1', name: 'Spring Festival', date: '2025-04-15' },
      { id: '2', name: 'Tech Meetup', date: '2025-04-20' },
      { id: '3', name: 'Career Fair', date: '2025-05-05' },
      { id: '4', name: 'Alumni Gathering', date: '2025-05-12' },
      { id: '5', name: 'Sports Tournament', date: '2025-05-18' },
    ];
    setEvents(mockEvents);
  }, []);

  const analyzeSentiment = (text: string) => {
    if (!text) {
      setSentiment(null);
      return;
    }

    const positiveWords = ['great', 'excellent', 'amazing', 'good', 'wonderful', 'enjoyed', 'love', 'best'];
    const negativeWords = ['bad', 'poor', 'terrible', 'worst', 'boring', 'disappointed', 'waste', 'awful'];

    let score = 0.5;
    const words = text.toLowerCase().split(/\s+/);

    for (const word of words) {
      if (positiveWords.includes(word)) score += 0.1;
      if (negativeWords.includes(word)) score -= 0.1;
    }

    score = Math.max(0, Math.min(1, score));

    let label = 'Neutral';
    if (score > 0.6) label = 'Positive';
    else if (score < 0.4) label = 'Negative';

    setSentiment({ score, label });
    setValue('sentimentScore', score);
    setValue('sentimentLabel', label);
  };

  const handleRating = (rate: number) => {
    setRating(rate);
    setValue('rating', rate);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setFeedbackText(text);
    setValue('feedback', text);
    analyzeSentiment(text);
  };

  const handleFormSubmit = (data: FeedbackFormData) => {
    data.sentimentScore = sentiment?.score || 0.5;
    data.sentimentLabel = sentiment?.label || 'Neutral';
    onSubmit(data);
    reset();
    setRating(0);
    setFeedbackText('');
    setSentiment(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-4xl font-bold mb-8">Feedback Submission</h1>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          <div>
            <label htmlFor="eventId" className="block text-2xl font-semibold mb-4">
              Select Event/Club
            </label>
            <select
              id="eventId"
              className={`w-full p-3 text-lg bg-white border rounded-lg appearance-none ${errors.eventId ? 'border-red-300' : 'border-gray-300'
                }`}
              {...register('eventId', { required: 'Please select an event' })}
            >
              <option value="">Select one...</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} - {new Date(event.date).toLocaleDateString()}
                </option>
              ))}
            </select>
            {errors.eventId && (
              <p className="mt-2 text-sm text-red-600">{errors.eventId.message}</p>
            )}
          </div>

          <div>
  <label className="block text-2xl font-semibold mb-4">
    Rating (out of 10)
  </label>
  <div className="flex items-center space-x-2">
    {[...Array(10)].map((_, index) => (
      <button
        key={index}
        onClick={() => handleRating(index + 1)}
        className={`w-10 h-10 rounded-full text-white font-semibold ${
          rating === index + 1 ? 'bg-yellow-500' : 'bg-gray-300'
        } hover:bg-yellow-400 transition`}
      >
        {index + 1}
      </button>
    ))}
  </div>
  {rating && (
    <p className="mt-4 text-lg">
      You selected {rating} out of 10. {rating <= 3 ? "We'll try to improve!" : rating <= 7 ? "Thanks for your feedback!" : "We're glad you liked it!"}
    </p>
  )}
</div>


          <div>
            <label htmlFor="feedback" className="block text-2xl font-semibold mb-4">
              Feedback
            </label>
            <textarea
              id="feedback"
              rows={4}
              className={`w-full p-4 text-lg border rounded-lg ${errors.feedback ? 'border-red-300' : 'border-gray-300'
                }`}
              placeholder="Share your thoughts about the event..."
              value={feedbackText}
              onChange={handleFeedbackChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className=" bg-primary-700 w-full py-4 text-xl font-semibold text-white rounded-lg hover:bg-primary-800  transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>

    </div>
  );
};

export default FeedbackForm;