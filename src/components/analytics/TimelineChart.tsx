import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TimelineChartProps {
  data: {
    date: string;
    sentiment: number;
  }[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
            formatter={(value) => [`${value.toFixed(2)}`, 'Sentiment Score']}
          />
          <Line
            type="monotone"
            dataKey="sentiment"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{
              stroke: '#2563eb',
              strokeWidth: 2,
              r: 4,
              fill: 'white',
            }}
            activeDot={{
              stroke: '#2563eb',
              strokeWidth: 2,
              r: 6,
              fill: '#2563eb',
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;