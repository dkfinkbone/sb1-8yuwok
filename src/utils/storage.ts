import { Tile, Group, TileClick } from '../types';

const TILES_KEY = 'tiles';
const GROUPS_KEY = 'groups';
const CLICKS_KEY = 'tile_clicks';

export const loadTiles = (): Tile[] => {
  const data = localStorage.getItem(TILES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTiles = (tiles: Tile[]) => {
  localStorage.setItem(TILES_KEY, JSON.stringify(tiles));
};

export const loadGroups = (): Group[] => {
  const data = localStorage.getItem(GROUPS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveGroups = (groups: Group[]) => {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
};

export const loadClicks = (): TileClick[] => {
  const data = localStorage.getItem(CLICKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveClicks = (clicks: TileClick[]) => {
  localStorage.setItem(CLICKS_KEY, JSON.stringify(clicks));
};