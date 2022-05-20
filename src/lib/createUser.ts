import express from 'express';
import {db} from '../modules/server';
import {Token} from '../modules/token';

const TokenGenerator: Token = new Token();


/**
 * Create a new user
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @return {*}
 */
export async function createUser(req: express.Request,
    res: express.Response, next: express.NextFunction) {
  const userId: string = db.getUsersCount() + 1;

  const user: object = {
    id: userId,
    config: '',
    token: TokenGenerator.generateToken(parseInt(userId)),
  };

  db.setByID.run(user);
  return user;
}
