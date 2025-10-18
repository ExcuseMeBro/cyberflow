import Database from 'better-sqlite3';
import path from 'path';
import { hashPassword } from './auth';

const dbPath = path.join(process.cwd(), 'cyberflow.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initializeDatabase() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_type TEXT NOT NULL CHECK(user_type IN ('user', 'parent')),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT NOT NULL UNIQUE,
      date_of_birth TEXT NOT NULL,
      password TEXT NOT NULL,
      username TEXT,
      display_name TEXT,
      bio TEXT,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      platform TEXT NOT NULL,
      url TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
    CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
    CREATE INDEX IF NOT EXISTS idx_user_links_user_id ON user_links(user_id);
  `);

  // Seed test users
  seedTestUsers();

  console.log('Database initialized successfully');
}

// Seed test users for development
function seedTestUsers() {
  // Check if test users already exist
  const gamerExists = db.prepare('SELECT id FROM users WHERE phone = ?').get('+10000000000');
  const parentExists = db.prepare('SELECT id FROM users WHERE phone = ?').get('+20000000000');

  // Create test gamer account if it doesn't exist
  if (!gamerExists) {
    const gamerPassword = hashPassword('guest123');
    db.prepare(`
      INSERT INTO users (user_type, first_name, last_name, phone, date_of_birth, password, username, display_name, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'user',
      'Test',
      'Gamer',
      '+10000000000',
      '2000-01-01',
      gamerPassword,
      'testgamer',
      'Test Gamer',
      'Test gamer account for development'
    );
    console.log('Test gamer account created');
  }

  // Create test parent account if it doesn't exist
  if (!parentExists) {
    const parentPassword = hashPassword('parent123');
    db.prepare(`
      INSERT INTO users (user_type, first_name, last_name, phone, date_of_birth, password, username, display_name, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'parent',
      'Test',
      'Parent',
      '+20000000000',
      '1980-01-01',
      parentPassword,
      'testparent',
      'Test Parent',
      'Test parent account for development'
    );
    console.log('Test parent account created');
  }
}

// Initialize the database when this module is imported
initializeDatabase();

export default db;
