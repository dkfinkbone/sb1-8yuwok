import { TileClick } from '../types';

const COLOR_STAGES = [
  'bg-green-100', // 0 clicks (pale green)
  'bg-green-200',
  'bg-green-300',
  'bg-green-400',
  'bg-green-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',  // Many clicks (red)
];

export const getTileColor = (tileId: string, clicks: TileClick[]): string => {
  const clickCount = clicks.filter(click => click.tileId === tileId).length;
  const colorIndex = Math.min(clickCount, COLOR_STAGES.length - 1);
  return COLOR_STAGES[colorIndex];
};