import {authenticateToken, generateAccessToken} from '@services/tokenService';
import express from 'express';
import {app} from '@modules/server';
import {verifyPassword} from '@services/verifyService';
import { TEN_MIN } from '@lib/time';
export async function generateAccessTokenRoute(req: express.Request, res: express.Response,
    next: express.NextFunction) {
    try{
        if(!await verifyPassword(req, res, next)) return res.status(401).json({
            'status': 'ERR',
            'message': 'You specified wrong credentials',
            'code': 'wrong_creds',
        });

        return res.status(401).json({
            'status': 'OK',
            'message': 'Access token sent',
            'expiresIn': TEN_MIN,
            'code': 'access_token_sent',
            'token': generateAccessToken(req.body.id)
        }); 
    }
    catch(e: any){
        return res.status(401).json({
            'status': 'ERR',
            'message': 'You did not specified credentials',
            'code': 'no_creds',
        });
    }
}