import { UserModel } from '../models/user.model.js';
import { update } from '../services/generic.services.js';
import { createUser, loginUser, updatePassword } from '../services/auth.services.js';

const model = UserModel;

//User Signup
export const signup = async (req, res, next) => {
    try {
        const result = await createUser(req, res, model);
        res.status(201).json({
            message: 'User Created.',
            status:'success',
            result: result
        })       
    } catch (error) {
        res.json({
            message: "Something Went Wrong!!",
            status:'failed',
            error: error.message
        });
        next(error);
    }
};

//User login
export const login = async (req, res, next) => {
    try {
        // console.log(req.body.email);
        const {user, token} = await loginUser(req, res, model); 
        res.status(200).json({ 
            message: 'Authentication Successful.',
            status:'success',
            token: token,
            result: user.email  
        })   
    } catch (error) {
        res.json({
            message: "Something Went Wrong!!",
            status:'failed',
            error: error.message
        });
        next(error);        
    }

}

//Get all users with pagination
export const getUsers = async (req,res, next) => {
    try {
        /*
        *pagination based on query
        *select can be used to display specific data
        */
        let query = {};
        const { page = 1, limit = 10 } = req.query;
        
        if (Object.keys(req.query).length > 0) {
            const {q} = req.query;
              
            query = {
                $or: [
                    {name: {$regex: q+"", $options: "$i"}},
                    {phone: {$regex: q+"", $options: "$i"}}
                ]
            };
        }   
        const user =  await UserModel.find(query)
        .limit(limit * 1)
        .skip((page -1) * limit)
        .sort({_id: 'desc'});                          
        
        res.status(200).json({
            total: user.length,
            message:'Displaying Results',
            status:'success',
            result: user
        });
        
        next();

    } catch (error) {
        if (res.statusCode == '200') res.status(400);
        res.json({
            message: 'Something Went Wrong!!',
            status:'failed',
            error: error.message
        });

        next(error);                                          //pass error for logging
    }
}

//Get user specific to ID 
export const getUserWithID = async (req,res,next) => {
    try {                     
        const userList = await UserModel.findById(req.params.id).sort({createdAt: 'desc'});              
        if(!userList) {
            res.status(404);
            throw new Error("User Not Found!!")
        }
        res.status(200).json({
            total: userList.length,
            message:'Displaying Result.',
            status:'success',
            result: userList
        });
        
        next();

    } catch (error) {
        
        res.json({
            message: 'Something Went Wrong!!',
            status:'failed',
            error: error
        });

        next(error);
    }
}

//List user from and to date range
export const listUserByDate = async (req,res,next) => {
    // check if date query exists
    // check if start date is less than end date or throw invalid input exception
    try {

        const {startDate, endDate} = req.body
        const puuid = req.params.id;
        if (Date.parse(endDate) <= Date.parse(startDate)) {
            res.status(400);
            throw new Error('BAD REQUEST: 400!! END date cannot be before START date');
        }
        
        const list = await UserModel.find({
            puuid: puuid,
            startDate: {
                "$gte": startDate,
                "$lt": endDate
            }
        });

        res.status(200).json({
            message:'Displaying Results.',
            status:'success',
            result: list
        });

        next();

    } catch (error) {
        if(res.statusCode == '200') res.status(400);
        res.json({
            message:'Something Went Wrong!!',
            status:'failed',
            error: error.message
        });

        next(error);
    } 
}

//Update
export const updateUser = async (req, res, next) => {
    try {        
        const result = await update(req, res, model);
        res.status(200).json({
            message: "User Updated.",
            status:'success',
            result: result
        });
        next();
    } catch (error) {
        res.json({
            message : "Something Went Wrong!!",
            status:'failed',
            error: error.message
        });
        next(error);
    }
};

//Chenge Password
export const changePassword = async (req, res, next) => {
    try {        
        const result = await updatePassword(req, res, model);
        res.status(200).json({
            message: "Password Updated.",
            status:'success',
            result: result
        });
        next();
    } catch (error) {
        res.json({
            message : "Something Went Wrong!!",
            status:'failed',
            error: error.message
        });
        next(error);
    }
};

//Delete
export const deleteUser = async (req, res, next) => {
    try {
        const user = await model.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: user,
            status:'success',
            message: "User Deleted"
        })
        next();

    } catch (error) {
        res.json({
           message : "Something Went Wrong!!",
           status:'failed',
           error: error.message
        });
        next(error);
    }  
}