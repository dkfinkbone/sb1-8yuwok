export const SCHEMA = `
  CREATE TABLE IF NOT EXISTS tiles (
    id TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    groupId TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE SET NULL
  );
  
  CREATE TABLE IF NOT EXISTS groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    attributes TEXT NOT NULL
  );
`;