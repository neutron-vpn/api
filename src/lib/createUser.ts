import express from 'express';
import {db} from '@modules/server';
import {authenticateToken, generateAccessToken} from '@services/tokenService';
import {hashSync} from 'bcrypt';
import { randomBytes } from 'crypto';
import {v4 as uuid} from 'uuid';

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
    res: express.Response, next: express.NextFunction): Promise<number | object> {
  console.log(req.body)
  if (req.body.password === undefined || req.body.username === undefined) return -1;
  let user: object = db.getByName.get(req.body.username);
  if (!user) {
    user = {
      username: req.body.username,
      id: uuid(),
      hash: hashSync(req.body.password, 10),
    };
  } else {
    return -2;
  }
  db.setByID.run(user);
  return user;
}
