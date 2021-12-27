import { UserModel } from '../models/user.model.js';
import { createUser, loginUser } from '../services/auth.services.js';

const model = UserModel;

//User Signup
export const signup = async (req, res, next) => {
    try {
        const result = await createUser(req, res, model); 
        res.status(201).json({
            message: 'User Created.',
            result: result
        })       
    } catch (error) {
        res.json({
            message: "Something Went Wrong!!",
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
            token: token,
            result: user.email  
        })   
    } catch (error) {
        res.json({
            message: "Something Went Wrong!!",
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
        const { page = 1, limit = 10 } = req.query;
        const user = await UserModel.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)                       //(page-1) isn't required if page value starts from 0  
            .sort({_id: 'desc'})                            //Sorting in descending order by objectId (desc, asc)
            //.select('startDate');                          
        
        res.status(200).json({
            total: user.length,
            message:'Displaying Results',
            result: user
        });
        
        next();

    } catch (error) {
        if (res.statusCode == '200') res.status(400);
        res.json({
            message: 'Something Went Wrong!!',
            error: error.message
        });

        next(error);                                          //pass error for logging
    }
}

//Get user specific to ID 
export const getUserWithID = async (req,res,next) => {
    try {                     
        const userList = await UserModel.findById(req.params.id).sort({createdAt: 'desc'});              
        
        res.status(200).json({
            total: userList.length,
            message:'Displaying Result.',
            result: userList
        });
        
        next();

    } catch (error) {
        if (res.statusCode == '200') res.status(400);
        res.json({
            message: 'Something Went Wrong!!',
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
            result: list
        });

        next();

    } catch (error) {
        if(res.statusCode == '200') res.status(400);
        res.json({
            message:'Something Went Wrong!!',
            error: error.message
        });

        next(error);
    } 
}

// //Update
// export const updateUser = async (req, res, next) => {
//     try {        
//         const result = await update(req, res, model);
//         res.status(200).json({
//             message: "User Updated.",
//             result: result
//         });
//         next();
//     } catch (error) {
//         res.json({
//             message : "Something Went Wrong!!",
//             error: error.message
//         });
//         next(error);
//     }
// };

//Delete
export const deleteUser = async (req, res, next) => {
    try {
        const user = await model.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: user,
            message: "User Deleted"
        })
        next();

    } catch (error) {
        res.json({
           message : "Something Went Wrong!!",
           error: error.message
        });
        next(error);
    }  
}