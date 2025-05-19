import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import SubmitFeedback from './pages/student/SubmitFeedback';
import FeedbackHistory from './pages/student/FeedbackHistory';
import StudentEvents from './pages/student/Events';
import StudentProfile from './pages/student/Profile';
import StudentFeedbackAnalysis from './pages/student/FeedbackAnalysis';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import AdminFeedback from './pages/admin/Feedback';
import FeedbackAnalysis from './pages/admin/FeedbackAnalysis';
import AdminProfile from './pages/admin/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/submit-feedback" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <SubmitFeedback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/feedback-history" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <FeedbackHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/feedback-analysis" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentFeedbackAnalysis />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/events" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentEvents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/profile" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/events" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminEvents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/feedback" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminFeedback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/feedback-analysis" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <FeedbackAnalysis />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect root to register */}
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;