import {compareSync} from 'bcrypt';
import express from 'express';
import {db} from '@modules/server';

/**
 * Verify password
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @return {*}
 */
export async function verifyPassword(req: express.Request,
    res: express.Response, next: express.NextFunction) {
  if(!db.getByID.get(req.body.id)) return false; 
  return compareSync(req.body.password, db.getByID.get(req.body.id).hash);
}
