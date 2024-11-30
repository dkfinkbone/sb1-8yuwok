import { create } from 'zustand';
import { TileSlice, createTileSlice } from './slices/tileSlice';
import { GroupSlice, createGroupSlice } from './slices/groupSlice';
import { AnalyticsSlice, createAnalyticsSlice } from './slices/analyticsSlice';

interface StoreState extends TileSlice, GroupSlice, AnalyticsSlice {
  initialized: boolean;
  loadData: () => void;
}

export const useTileStore = create<StoreState>()((set, get, store) => ({
  ...createTileSlice(set, get, store),
  ...createGroupSlice(set, get, store),
  ...createAnalyticsSlice(set, get, store),
  
  initialized: false,
  
  loadData: () => {
    if (!get().initialized) {
      const tiles = get().loadTiles();
      const groups = get().loadGroups();
      const clicks = get().loadClicks();
      set({ initialized: true, tiles, groups, clicks });
    }
  }
}));