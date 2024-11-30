import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { useTileStore } from '../../store/tileStore';
import { format, subDays } from 'date-fns';

type ChartType = 'bar' | 'heatmap' | 'bubble' | 'treemap';

export const TileClickChart: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const { getClickStats, clicks, tiles, groups } = useTileStore();
  const stats = getClickStats();

  // Prepare data for heat map
  const heatmapData = clicks.map(click => ({
    day: format(new Date(click.timestamp), 'yyyy-MM-dd'),
    value: 1
  })).reduce((acc, { day, value }) => {
    acc[day] = (acc[day] || 0) + value;
    return acc;
  }, {} as Record<string, number>);

  const calendarData = Object.entries(heatmapData).map(([day, value]) => ({
    day,
    value
  }));

  // Prepare data for bubble chart
  const bubbleData = {
    name: 'tiles',
    children: stats.map(stat => ({
      name: stat.description,
      value: stat.clickCount
    }))
  };

  // Prepare data for treemap
  const treemapData = {
    name: 'tiles',
    children: groups.map(group => ({
      name: group.name,
      children: stats
        .filter(stat => tiles.find(t => t.id === stat.tileId)?.groupId === group.id)
        .map(stat => ({
          name: stat.description,
          value: stat.clickCount
        }))
    })).concat({
      name: 'Ungrouped',
      children: stats
        .filter(stat => !tiles.find(t => t.id === stat.tileId)?.groupId)
        .map(stat => ({
          name: stat.description,
          value: stat.clickCount
        }))
    }).filter(group => group.children.length > 0)
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Tile Click Analytics</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded ${
              chartType === 'bar'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('heatmap')}
            className={`px-3 py-1 rounded ${
              chartType === 'heatmap'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Heat Map
          </button>
          <button
            onClick={() => setChartType('bubble')}
            className={`px-3 py-1 rounded ${
              chartType === 'bubble'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bubble Chart
          </button>
          <button
            onClick={() => setChartType('treemap')}
            className={`px-3 py-1 rounded ${
              chartType === 'treemap'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Treemap
          </button>
        </div>
      </div>

      <div className="h-[400px]">
        {chartType === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <XAxis 
                dataKey="description" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clickCount" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'heatmap' && (
          <ResponsiveCalendar
            data={calendarData}
            from={subDays(new Date(), 365).toISOString()}
            to={new Date().toISOString()}
            emptyColor="#eeeeee"
            colors={['#a8e6cf', '#3ecd5e', '#2db546', '#1a9e35', '#147d2b']}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
          />
        )}

        {chartType === 'bubble' && (
          <ResponsiveCirclePacking
            data={bubbleData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            id="name"
            value="value"
            colors={{ scheme: 'paired' }}
            childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
            padding={4}
            enableLabels={true}
            labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          />
        )}

        {chartType === 'treemap' && (
          <ResponsiveTreeMap
            data={treemapData}
            identity="name"
            value="value"
            valueFormat=".02s"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            labelSkipSize={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            parentLabelPosition="left"
            parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          />
        )}
      </div>
    </div>
  );
};