import express from 'express';
import {createUser} from '@lib/createUser';
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
  try {
    const user: any = await createUser(req, res, next);

    if (user === -1) {
      return res.status(401).json({
        'status': 'ERR',
        'message': 'You did not specified password or username',
        'code': 'password_username_undefined',
      });
    }
    if (user === -2) {
      return res.status(409).json({
        'status': 'ERR',
        'message': 'Username already in use',
        'code': 'conflict',
      });
    }

    res.json({
      'status': 'OK',
      'message': 'User successfuly created',
      'code': 'user_created',
      'id': user.id,
      'token': user.token,
    });
  } catch (e: any) {
    res.status(500).json({
      'status': 'ERR',
      'message': 'An error occured at server side',
      'code': 'server_error',
      'jsError': e.message,
    });
  }
}