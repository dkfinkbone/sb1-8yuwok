import { StateCreator } from 'zustand';
import { nanoid } from 'nanoid';
import { Tile } from '../../types';
import { CategoryType } from '../../types/enums';
import { loadTiles, saveTiles } from '../../utils/storage';

export interface TileSlice {
  tiles: Tile[];
  addTile: (description: string, groupId?: string | null, note?: string, category?: CategoryType) => Tile;
  deleteTile: (id: string) => void;
  updateTileDescription: (id: string, description: string) => void;
  updateTileNote: (id: string, note: string) => void;
  updateTileCategory: (id: string, category: CategoryType) => void;
  updateTileGroup: (tileId: string, groupId: string | null) => void;
  loadTiles: () => Tile[];
}

export const createTileSlice: StateCreator<TileSlice> = (set, get) => ({
  tiles: [],
  
  addTile: (description: string, groupId?: string | null, note?: string, category?: CategoryType) => {
    const newTile: Tile = {
      id: nanoid(),
      description,
      groupId: groupId || null,
      createdAt: new Date().toISOString(),
      note,
      category
    };
    
    set(state => {
      const newTiles = [...state.tiles, newTile];
      saveTiles(newTiles);
      return { tiles: newTiles };
    });

    return newTile;
  },
  
  deleteTile: (id: string) => {
    set(state => {
      const newTiles = state.tiles.filter(tile => tile.id !== id);
      saveTiles(newTiles);
      return { tiles: newTiles };
    });
  },

  updateTileDescription: (id: string, description: string) => {
    set(state => {
      const newTiles = state.tiles.map(tile =>
        tile.id === id ? { ...tile, description } : tile
      );
      saveTiles(newTiles);
      return { tiles: newTiles };
    });
  },

  updateTileNote: (id: string, note: string) => {
    set(state => {
      const newTiles = state.tiles.map(tile =>
        tile.id === id ? { ...tile, note: note || undefined } : tile
      );
      saveTiles(newTiles);
      return { tiles: newTiles };
    });
  },

  updateTileCategory: (id: string, category: CategoryType) => {
    set(state => {
      const newTiles = state.tiles.map(tile =>
        tile.id === id ? { ...tile, category: category || undefined } : tile
      );
      saveTiles(newTiles);
      return { tiles: newTiles };
    });
  },

  updateTileGroup: (tileId: string, groupId: string | null) => {
    set(state => {
      const newTiles = state.tiles.map(tile =>
        tile.id === tileId ? { ...tile, groupId } : tile
      );
      saveTiles(newTiles);
      return { tiles: newTiles };
    });
  },

  loadTiles: () => {
    const tiles = loadTiles();
    set({ tiles });
    return tiles;
  }
});