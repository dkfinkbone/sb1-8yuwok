import { CategoryType } from './enums';

export interface Tile {
  id: string;
  description: string;
  groupId: string | null;
  createdAt: string;
  note?: string;
  category?: CategoryType;
}

export interface Group {
  id: string;
  name: string;
  attributes: string[];
}

export interface TileClick {
  tileId: string;
  timestamp: string;
  category?: CategoryType;
}

export interface TileClickStats {
  tileId: string;
  description: string;
  clickCount: number;
}

export interface GameAnalysis {
  date: string;
  categoryA: number;
  categoryB: number;
  categoryC: number;
  total: number;
}