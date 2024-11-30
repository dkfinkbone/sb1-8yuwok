import { Tile, Group } from '../types';
import { loadTiles, saveTiles, loadGroups, saveGroups } from '../utils/storage';

export async function initDatabase() {
  try {
    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
}

export async function addTile(tile: Tile) {
  try {
    const tiles = loadTiles();
    tiles.push(tile);
    saveTiles(tiles);
  } catch (error) {
    console.error('Error adding tile:', error);
  }
}

export async function deleteTile(id: string) {
  try {
    const tiles = loadTiles();
    const newTiles = tiles.filter(tile => tile.id !== id);
    saveTiles(newTiles);
  } catch (error) {
    console.error('Error deleting tile:', error);
  }
}

export async function getTiles() {
  try {
    return loadTiles();
  } catch (error) {
    console.error('Error getting tiles:', error);
    return [];
  }
}

export async function addGroup(group: Group) {
  try {
    const groups = loadGroups();
    groups.push(group);
    saveGroups(groups);
  } catch (error) {
    console.error('Error adding group:', error);
  }
}

export async function deleteGroup(id: string) {
  try {
    const groups = loadGroups();
    const newGroups = groups.filter(group => group.id !== id);
    saveGroups(newGroups);
  } catch (error) {
    console.error('Error deleting group:', error);
  }
}

export async function updateTileGroup(tileId: string, groupId: string | null) {
  try {
    const tiles = loadTiles();
    const newTiles = tiles.map(tile =>
      tile.id === tileId ? { ...tile, groupId } : tile
    );
    saveTiles(newTiles);
  } catch (error) {
    console.error('Error updating tile group:', error);
  }
}

export async function getGroups() {
  try {
    return loadGroups();
  } catch (error) {
    console.error('Error getting groups:', error);
    return [];
  }
}