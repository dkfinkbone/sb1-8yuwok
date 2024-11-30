import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, isToday } from 'date-fns';
import { useTileStore } from '../../store/tileStore';
import { CategoryType } from '../../types/enums';
import { GameAnalysis } from '../../types';

export const GameAnalysisChart = () => {
  const { getGameAnalysis } = useTileStore();
  const [showAll, setShowAll] = useState(false);
  
  const todayStats = getGameAnalysis(new Date())[0] || {
    date: new Date().toISOString().split('T')[0],
    categoryA: 0,
    categoryB: 0,
    categoryC: 0,
    total: 0
  };
  
  const historicalStats = showAll 
    ? getGameAnalysis(subDays(new Date(), 90))
    : null;

  const data = historicalStats || [todayStats];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Game Analysis</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {showAll ? 'Show Today' : 'Show 90 Days'}
        </button>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval={showAll ? 6 : 0}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="categoryA" name="Category A" fill="#4ade80" />
            <Bar dataKey="categoryB" name="Category B" fill="#60a5fa" />
            <Bar dataKey="categoryC" name="Category C" fill="#f472b6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {isToday(new Date(todayStats.date)) && (
        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-lg font-bold">{todayStats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-lg font-bold">{todayStats.categoryA}</div>
            <div className="text-sm text-gray-600">Category A</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-lg font-bold">{todayStats.categoryB}</div>
            <div className="text-sm text-gray-600">Category B</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="text-lg font-bold">{todayStats.categoryC}</div>
            <div className="text-sm text-gray-600">Category C</div>
          </div>
        </div>
      )}
    </div>
  );
};