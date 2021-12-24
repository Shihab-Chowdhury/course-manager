import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwt_key } from '../config/config.js'
import moment from 'moment';

//to check for duplicate emails
export const checkDuplication = async (req, res, model) => {
    const user = await model.find({email: req.body.email});
    if (user.length > 0) {        //checks array length
        return true;
    }
    return false;
} 

//createa new user during user signup
export const createUser =  async (req, res , model) => {
    const duplicate = await checkDuplication(req, res, model);
    if (duplicate){
        res.status(409);
        throw new Error ("Mail Already Exists.");
    }; 
    const { password } = req.body;    
    const salt = bcrypt.genSaltSync(10);    //generate salt    
    const hash = bcrypt.hashSync(password, salt);   //generate hash
    req.body.password = hash;
    const result = await model.create(req.body);
    return result;
}

//authenticate user
export const loginUser = async (req, res, model) => {
    const user = await model.findOne({email: req.body.email}); 
    // console.log(user);
    if (!user){
        res.status(401);
        throw new Error ("Authentication Failed.")
    };
    const result = bcrypt.compareSync(req.body.password, user.password); // true
    const token = jwt.sign({
        iat: moment().unix(),
        sub: user._id,
        exp: moment().add(6, "hours").unix(),
    }, jwt_key);
    if (!result) {
        res.status(401);
        throw new Error ("Authentication Failed.")
    }
    return {user: user, token: token};
}


