import { Tile } from '../types';

export const addTile = (db: any, tile: Tile) => {
  const stmt = db.prepare(
    'INSERT INTO tiles (id, description, groupId, createdAt) VALUES (?, ?, ?, ?)'
  );
  stmt.bind([tile.id, tile.description, tile.groupId, tile.createdAt]);
  stmt.step();
  stmt.finalize();
};

export const deleteTile = (db: any, id: string) => {
  const stmt = db.prepare('DELETE FROM tiles WHERE id = ?');
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
};

export const getTiles = (db: any): Tile[] => {
  const tiles: Tile[] = [];
  const stmt = db.prepare('SELECT * FROM tiles');
  while (stmt.step()) {
    const row = stmt.get();
    tiles.push({
      id: row[0],
      description: row[1],
      groupId: row[2],
      createdAt: row[3]
    });
  }
  stmt.finalize();
  return tiles;
};

export const updateTileGroup = (db: any, tileId: string, groupId: string | null) => {
  const stmt = db.prepare('UPDATE tiles SET groupId = ? WHERE id = ?');
  stmt.bind([groupId, tileId]);
  stmt.step();
  stmt.finalize();
};