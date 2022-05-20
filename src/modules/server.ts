import express, {Application} from 'express';
import {logger} from '../main';
import * as actions from '../lib/action';
import {ServerDatabase} from '../modules/database';
export const db: ServerDatabase = new ServerDatabase();
export const app: Application = express();

/**
 * API Server class
 *
 * @export
 * @class Server
 */
export class Server {
  /**
   * Creates an instance of Server.
   * @memberof Server
   */
  constructor() {
    const port = 5000;

    app.all('/', actions.root);
    app.all('/user/register', actions.registerUser);
    app.all('/coffee/make', actions.makeACoffee);

    app.listen(port, () => logger.info(`Running HTTP server on port ${port}`));
  }
}
