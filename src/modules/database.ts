import Database, {Statement} from 'better-sqlite3';
const sql = new Database('database.db');

/**
 * Database class
 *
 * @export
 * @class ServerDatabase
 */
export class ServerDatabase {
  public sql: any;
  public getByID: Statement;
  public getByName: Statement;
  public setByID: Statement;

  /**
   * Creates an instance of ServerDatabase.
   * @memberof ServerDatabase
   */
  constructor() {
    this.sql = sql;
    const tableUsers = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'users\';').get();
    if (!tableUsers['count(*)']) {
      this.sql.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, ' +
      'username TEXT, hash TEXT);').run();
      this.sql.prepare('CREATE UNIQUE INDEX ' +
      'idx_scores_id ON users (id);').run();
      this.sql.pragma('synchronous = 1');
      this.sql.pragma('journal_mode = wal');
    }
    this.getByID = sql.prepare('SELECT * FROM users ' +
    'WHERE id = ?');
    this.getByName = sql.prepare('SELECT * FROM users ' +
    'WHERE username = ?');
    this.setByID = sql.prepare('INSERT OR REPLACE INTO users (id, username, ' +
    'hash) VALUES (@id, @username, @hash);');
  }

  /**
 * Get all users count
 *
 * @memberof ServerDatabase
 * @return {string}
 */
  getUsersCount(): string {
    return sql.prepare('SELECT COUNT(ID) FROM users').get()['COUNT(ID)'];
  }
}
