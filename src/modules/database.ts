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
  public setByID: Statement;

  /**
   * Creates an instance of ServerDatabase.
   * @memberof ServerDatabase
   */
  constructor() {
    this.sql = sql;
    const tableUsers = this.sql.prepare().get();
    if (!tableUsers['count(*)']) {
      this.sql.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, ' +
      'config TEXT, token TEXT);').run();
      this.sql.prepare('CREATE UNIQUE INDEX ' +
      'idx_scores_id ON users (id);').run();
    }
    this.getByID = sql.prepare('SELECT * FROM users ' +
    'WHERE id = ?');
    this.setByID = sql.prepare('INSERT OR REPLACE INTO users (id, config, ' +
    'token) VALUES (@id, @config, @token);');
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
