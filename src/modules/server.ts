import express, { Application } from 'express';
import { logger } from '@root/main';
import { rootRoute } from '@routes/rootRoute';
import { registerUser } from '@routes/registerRoute';
import { generateAccessTokenRoute } from '@routes/accessTokenRoute';
import { endpointsTest } from '@routes/testEndpointRoute';
import rateLimit from 'express-rate-limit'
import { ServerDatabase } from '@modules/database';
export const db: ServerDatabase = new ServerDatabase();
export const app: Application = express();
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
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
    const authLimit = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 25,
      message: {
        'status': 'ERR',
        'message': 'Too many requests, please try again later.',
        'code': 'ratelimit',
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
    dotenv.config();
    app.use(bodyParser.urlencoded({
      extended: true,
    }));
    app.use(express.json());

    app.all('/', rootRoute);
    app.all('/user/register', authLimit, registerUser);
    app.all('/user/getAccessToken', authLimit, generateAccessTokenRoute);
    app.all('/endpoint/test', endpointsTest);

    app.listen(port, () => logger.info(`Running HTTP server on port ${port}`));
  }
}
