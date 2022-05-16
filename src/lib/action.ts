import express from 'express'
import { logger } from '../main';
import config from 'config';
import { db } from '../modules/server';
import { app } from '../modules/server'
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export function registerUser(req: express.Request, res: express.Response, next: express.NextFunction){
    let userId: number = db.getUsersCount()['COUNT(ID)'] + 1;
    let token = "n-" + crypto.randomBytes(2).toString('hex') + "-" + crypto.randomBytes(2).toString('hex') + "-" + crypto.randomBytes(8).toString('hex') + "+" + userId;
    console.log(token)
    let user: object = {
        id: userId,
        config: "d",
        token: token
    }

    db.setByID.run(user);
    res.json({
        "status": "OK",
        "message": "User successfuly created",
        "code": "user_created",
        "id": userId,
        "token": db.getByID.get(userId).token
    });
}

export function getConfig(req: express.Request, res: express.Response, next: express.NextFunction){
    try{
        let user: string = "";
        let payload: any = jwt.decode(req.query.token as string);
        let id: string = JSON.parse(payload).id;
        
    }
    catch(e){
        res.status(500).json({
            "status": "ERR",
            "message": "An error occured at server side, possible reason is malformed token",
            "code": "server_error"
        });
    }
}

export function root(req: express.Request, res: express.Response, next: express.NextFunction){
    var routesList: any[] = [];
    app._router.stack.forEach(function(r: any){
        if (r.route && r.route.path){
          routesList.push(r.route.path);
        }
    });

    res.json({
        "status": "OK",
        "version": "1.0",
        "routes": routesList
    });
}

export function makeACoffee(req: express.Request, res: express.Response, next: express.NextFunction){
    res.status(418).json({status: "ERR", message: "I'm a teapot!", code: "ima_teapot"});
}