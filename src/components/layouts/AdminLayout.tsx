import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  School,
  User,
  LogOut,
  BarChart2,
  Calendar,
  FileText,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Footer from '../common/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      name: 'Events',
      path: '/admin/events',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      name: 'Feedback',
      path: '/admin/feedback',
      icon: <FileText className="w-6 h-6" />,
    },
    {
      name: 'Analysis',
      path: '/admin/feedback-analysis',
      icon: <Layers className="w-6 h-6" />,
    },
    {
      name: 'Profile',
      path: '/admin/profile',
      icon: <User className="w-6 h-6" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-primary-800 border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <School className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-semibold text-white">Admin Panel</span>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`${
                        isActive
                          ? 'bg-primary-900 text-white'
                          : 'text-primary-100 hover:bg-primary-700'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                    {user?.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs font-medium text-primary-200 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex-shrink-0 bg-primary-700 p-1 rounded-full text-primary-200 hover:text-white"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden bg-primary-800 w-full fixed top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <School className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-semibold text-white">Admin Panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex-shrink-0 bg-primary-700 p-1 rounded-full text-primary-200 hover:text-white"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            {children}
            <Footer />
          </div>
        </main>

        {/* Mobile navigation */}
        <div className="md:hidden bg-primary-800 fixed bottom-0 w-full z-10">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${
                    isActive ? 'text-white' : 'text-primary-200'
                  } flex flex-col items-center py-2 px-1`}
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;