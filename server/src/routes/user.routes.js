import express from 'express';
import { deleteUser, 
         getUsers, 
         getUserWithID,
         listUserByDate,
         signup,
         updateUser,
         login,
         changePassword,
        } from '../controllers/user.controller.js';  
import { checkAuth } from '../middlewares/check-auth.js';
import { loginValidator, userValidator, validate } from '../middlewares/validator.js';
import { updatePassValidator } from '../middlewares/validators/user.validator.js';

const router = express.Router();

// POST: api/users/signup
// user signup 
router.post('/signup', userValidator, validate, signup);

// POST: api/users/login
// user login
router.post('/login', loginValidator, validate, login);

// GET: api/users/search
// view all the users  
router.get('/search', getUsers);

// GET: api/users/search/id
// view all the billing specific to puuid instead of the mongoose object id
router.get('/search/:id', getUserWithID);

// GET: api/users/list-bydate/id
// view all the billings specific to a date range
router.get('/list-by-date/:id', listUserByDate);

// PUT: api/users/update
// update user
router.put('/update/:id', updateUser) 

// PACTCH: api/users/update-password/:id
// update password
router.patch('/update-password/:id', updatePassValidator, changePassword) 

// DELETE: api/users/delete
// delete user
router.delete('/delete/:id', deleteUser)

export default router;

