import Database, { Statement } from 'better-sqlite3';
const sql = new Database('database.db');

export class database {

    public sql: any;
    public getByID: Statement;
    public setByID: Statement;

    constructor(){
        this.sql = sql;
        const tableUsers = this.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';").get();
        if (!tableUsers['count(*)']) {
          this.sql.prepare("CREATE TABLE users (id TEXT PRIMARY KEY, config TEXT, token TEXT);").run();
          this.sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON users (id);").run();
          this.sql.pragma("synchronous = 1");
          this.sql.pragma("journal_mode = wal");
        }
        this.getByID = sql.prepare("SELECT * FROM users WHERE id = ?");
        this.setByID = sql.prepare("INSERT OR REPLACE INTO users (id, config, token) VALUES (@id, @config, @token);");
    }

    getUsersCount(){
      return sql.prepare("SELECT COUNT(ID) FROM users").get();
    }
}
