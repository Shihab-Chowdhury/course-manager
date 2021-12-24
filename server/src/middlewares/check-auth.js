import jwt from 'jsonwebtoken';
import { jwt_key } from '../config/config.js';

export const checkAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwt_key);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Not Authorized'
        });
    }
};