import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 overflow-hidden">
      <div className="flex items-center">
        {icon && <div className="mr-4 text-primary-600">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      {(description || trend) && (
        <div className="mt-4">
          {description && <p className="text-sm text-gray-500">{description}</p>}
          {trend && (
            <div
              className={`mt-1 text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              } flex items-center`}
            >
              <span
                className={`mr-1 ${
                  trend.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'}
              </span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="ml-1">from last month</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;