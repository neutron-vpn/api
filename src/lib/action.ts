import express from 'express';
import {app} from '../modules/server';
import {createUser} from './createUser';


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
}
