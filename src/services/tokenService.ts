import jwt from 'jsonwebtoken';
import {randomBytes} from 'crypto';
import dotenv from 'dotenv';
import {Request, Response} from 'express';
import {TEN_MIN} from '@lib/time';
/**
  * Generate a token
  *
  * @param {number} id
  * @return {string}
  */
export function generateAccessToken(id: string) {
  return jwt.sign({id: id}, process.env.TOKEN_SECRET!, {expiresIn: TEN_MIN});
}

/**
 * Parse ID from token
 *
 * @param {string} token
 * @return {number}
 */
export function authenticateToken(req: any, res: Response, next: any): number {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return -401;

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return -403;

    req.user = user;

    next();
    return 200;
  });
  return -1;
}
