import { StateCreator } from 'zustand';
import { TileClick, GameAnalysis } from '../../types';
import { CategoryType } from '../../types/enums';
import { loadClicks, saveClicks } from '../../utils/storage';
import { startOfDay, isWithinInterval, format } from 'date-fns';

interface StoreState {
  tiles: Array<{ id: string; description: string; category?: CategoryType }>;
  clicks: TileClick[];
}

export interface AnalyticsSlice {
  clicks: TileClick[];
  recordClick: (tileId: string) => void;
  getClickStats: () => Array<{ tileId: string; description: string; clickCount: number }>;
  getGameAnalysis: (startDate: Date) => GameAnalysis[];
  loadClicks: () => TileClick[];
}

export const createAnalyticsSlice: StateCreator<StoreState, [], [], AnalyticsSlice> = (set, get) => ({
  clicks: [],
  
  recordClick: (tileId: string) => {
    const tile = get().tiles.find(t => t.id === tileId);
    
    set(state => {
      const newClick = {
        tileId,
        timestamp: new Date().toISOString(),
        category: tile?.category
      };
      const newClicks = [...state.clicks, newClick];
      saveClicks(newClicks);
      return { clicks: newClicks };
    });
  },

  getClickStats: () => {
    const state = get();
    const stats = new Map<string, number>();
    
    state.clicks.forEach(click => {
      const count = stats.get(click.tileId) || 0;
      stats.set(click.tileId, count + 1);
    });

    return Array.from(stats.entries()).map(([tileId, clickCount]) => {
      const tile = state.tiles.find(t => t.id === tileId);
      return {
        tileId,
        description: tile?.description || 'Unknown Tile',
        clickCount
      };
    }).sort((a, b) => b.clickCount - a.clickCount);
  },

  getGameAnalysis: (startDate: Date) => {
    const state = get();
    const endDate = new Date();
    const interval = { start: startOfDay(startDate), end: endDate };

    const dailyStats = new Map<string, GameAnalysis>();

    state.clicks
      .filter(click => isWithinInterval(new Date(click.timestamp), interval))
      .forEach(click => {
        const day = format(new Date(click.timestamp), 'yyyy-MM-dd');
        const stats = dailyStats.get(day) || {
          date: day,
          categoryA: 0,
          categoryB: 0,
          categoryC: 0,
          total: 0
        };

        stats.total++;
        if (click.category === CategoryType.A) stats.categoryA++;
        if (click.category === CategoryType.B) stats.categoryB++;
        if (click.category === CategoryType.C) stats.categoryC++;

        dailyStats.set(day, stats);
      });

    return Array.from(dailyStats.values())
      .sort((a, b) => a.date.localeCompare(b.date));
  },

  loadClicks: () => {
    const clicks = loadClicks();
    set({ clicks });
    return clicks;
  }
});