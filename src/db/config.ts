import { Tile, Group } from '../types';

// In-memory storage
const storage = {
  tiles: new Map<string, Tile>(),
  groups: new Map<string, Group>()
};

export const db = {
  tiles: storage.tiles,
  groups: storage.groups
};