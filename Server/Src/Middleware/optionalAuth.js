import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import redisClient from '../config/Redis.js';

const optionalAuth = async (req, _res, next) => {
    try{
        const { Token } = req.cookies || {};
        if(!Token){
            return next();
        }

        const payload = jwt.verify(Token, process.env.SECRET_KEY);
        const isBlocked = await redisClient.exists(`Token ${Token}`);
        if(isBlocked){
            return next();
        }

        const user = await User.findById(payload._id);
        if(user){
            req.user = user;
        }
    }catch(err){
        // swallow errors to keep request public
    }
    next();
};

export default optionalAuth;

