import express from 'express'
import { logger } from '../main';
import * as actions from '../lib/action';
import config from 'config';
import { database } from '../modules/database';
import { WebSocketServer } from 'ws';

export const db = new database();
export var app: any;
export class Server {

    constructor() {
        const wsPort = 3030
        const port = 5000;
        const wss = new WebSocketServer({ port: wsPort });
        app = express();

        app.all('/', actions.root);
        app.all('/user/register', actions.registerUser);
        app.all('/coffee/make', actions.makeACoffee);

        app.listen(port, () => logger.info(`Running HTTP server on port ${port}`));

        wss.on('connection', function connection(ws) {
          ws.on('message', function message(data) {
            console.log('received: %s', data);
          });
        
          ws.send('something');
        });
    }
   

}