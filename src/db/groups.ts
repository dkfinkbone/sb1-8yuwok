import { Group } from '../types';

export const addGroup = (db: any, group: Group) => {
  const stmt = db.prepare(
    'INSERT INTO groups (id, name, attributes) VALUES (?, ?, ?)'
  );
  stmt.bind([group.id, group.name, JSON.stringify(group.attributes)]);
  stmt.step();
  stmt.finalize();
};

export const deleteGroup = (db: any, id: string) => {
  let stmt = db.prepare('DELETE FROM groups WHERE id = ?');
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();

  stmt = db.prepare('UPDATE tiles SET groupId = NULL WHERE groupId = ?');
  stmt.bind([id]);
  stmt.step();
  stmt.finalize();
};

export const getGroups = (db: any): Group[] => {
  const groups: Group[] = [];
  const stmt = db.prepare('SELECT * FROM groups');
  while (stmt.step()) {
    const row = stmt.get();
    groups.push({
      id: row[0],
      name: row[1],
      attributes: JSON.parse(row[2])
    });
  }
  stmt.finalize();
  return groups;
};