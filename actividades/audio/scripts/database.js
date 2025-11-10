import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('app.db');

export async function initDB() {
  await db.execAsync(`DROP TABLE IF EXISTS songs;`);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      img_route TEXT NOT NULL,
      song_route TEXT NOT NULL,
      artistas TEXT NOT NULL
    );
  `);
}

export async function clearDatabase() {
  try {
    await db.execAsync(`
      DELETE FROM songs;
      VACUUM;
    `);

  } catch (error) {
    console.error('Error al limpiar la base:', error);
  }
}

export async function insert(name,img_route, song_route, artistas) {
  await db.runAsync(
    'INSERT INTO songs (name, img_route, song_route, artistas) VALUES (?, ?, ?, ?);',
    [name, img_route, song_route, artistas]
  );
}

export async function getAll() {
  const result = await db.getAllAsync('SELECT * FROM songs;');
  return result; // Lista => [{ id, name, email }]
}
