import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { IUserToAuthJSON } from "../../database/model/user.model";
import { JWT_SECRET } from "../../config/config";

interface RequestWithUserRole extends Request {
    user?: IUserToAuthJSON;
}

const authenticated = (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(" ")[1];
  
    if (!token || token == null) return res.status(401).json({status: false, message: 'Login to continue' })
  
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err instanceof jwt.TokenExpiredError) return res.status(401).json({status: false, message: 'Unauthorized! Access Token was expired!' })
        
        if (err instanceof jwt.JsonWebTokenError) return res.status(401).json({status: false, message: 'Unauthorized! Invalid Token!' })
        
        if (err) return res.status(401).json({status: false, message: 'Not Authenticated'})
        
        req.user = user;
    
        next()
    })
}

export default authenticated;

