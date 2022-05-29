import express from 'express';
import {app} from '@modules/server';
import { authenticateToken } from '@services/tokenService';
/**
 * Test endpoint
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
 export function endpointsTest(req: express.Request,
    res: express.Response, next: express.NextFunction) {
  if(authenticateToken(req, res, next) === 200){

  }
  res.status(200).json({status: 'OK',
    message: 'Authorization working!', code: 'test_sucess'});
}