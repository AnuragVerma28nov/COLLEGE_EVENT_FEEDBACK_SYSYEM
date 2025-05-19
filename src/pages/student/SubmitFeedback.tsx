import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import StudentLayout from '../../components/layouts/StudentLayout';
import FeedbackForm, { FeedbackFormData } from '../../components/feedback/FeedbackForm';

const SubmitFeedback: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');

  const handleSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Feedback submitted:', data);
      toast.success('Feedback submitted successfully!');
      navigate('/student');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StudentLayout>
      <div className="mt-6 md:mt-10 pb-12">
        <FeedbackForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </div>
    </StudentLayout>
  );
};

export default SubmitFeedback;