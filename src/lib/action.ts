<<<<<<< HEAD
import express from 'express';
import {app} from '../modules/server';
import {createUser} from './createUser';

=======
import express from 'express'
import { logger } from '../main';
import config from 'config';
import { db } from '../modules/server';
import { app } from '../modules/server'
import * as crypto from 'crypto';

export function registerUser(req: express.Request, res: express.Response, next: express.NextFunction){
    let userId: number = db.getUsersCount()['COUNT(ID)'] + 1;
    let token = "n-" + crypto.randomBytes(2).toString('hex') + "-" + crypto.randomBytes(2).toString('hex') + "-" + crypto.randomBytes(8).toString('hex') + "+" + userId;
    console.log(token)
    let user: object = {
        id: userId,
        config: "no config",
        token: token
    }
>>>>>>> 7e7a2f7cc38be4682b9960426994c93c1745fd27

/**
 * Register user route handler
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function registerUser(req: express.Request,
    res: express.Response, next: express.NextFunction) {
  const user: any = await createUser(req, res, next);
  res.json({
    'status': 'OK',
    'message': 'User successfuly created',
    'code': 'user_created',
    'id': user.id,
    'token': user.token,
  });
}

<<<<<<< HEAD
/**
 * Get user config route handler
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function getConfig(req: express.Request,
    res: express.Response, next: express.NextFunction) {
  try {
=======
export function getConfig(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        let token = req.query.token?.toString();
        
    }
    catch(e){
        res.status(500).json({
            "status": "ERR",
            "message": "An error occured at server side, possible reason is malformed token",
            "code": "server_error"
        });
    }
}
>>>>>>> 7e7a2f7cc38be4682b9960426994c93c1745fd27

  } catch (e) {
    res.status(500).json({
      'status': 'ERR',
      'message': 'An error occured at server side,' +
      'possible reason is malformed token',
      'code': 'server_error',
    });
  }
}

/**
 * Root route handler
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function root(req: express.Request,
    res: express.Response, next: express.NextFunction) {
  const routesList: any[] = [];
  app._router.stack.forEach(function(r: any) {
    if (r.route && r.route.path) {
      routesList.push(r.route.path);
    }
  });

  res.json({
    'status': 'OK',
    'version': '1.0',
    'routes': routesList,
  });
}

<<<<<<< HEAD
/**
 * Make a coffe route handler (btw i cant make coffee)
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export function makeACoffee(req: express.Request,
    res: express.Response, next: express.NextFunction) {
  res.status(418).json({status: 'ERR',
    message: 'I\'m a teapot!', code: 'ima_teapot'});
=======
export function makeACoffee(req: express.Request, res: express.Response, next: express.NextFunction){
    res.status(418).json({status: "ERR", message: "I'm a teapot!", code: "ima_teapot"});
>>>>>>> 7e7a2f7cc38be4682b9960426994c93c1745fd27
}
