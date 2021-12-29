import pkg from 'express-validator';

import { loginValidator, userValidator } from './validators/user.validator.js';

const { validationResult } = pkg;

const validate = (req, res, next) => {   
    
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
        // console.log(errors.array());
        return res.status(400).json({ error: error.array() });
        // next(new Error("Bad Request, 400"))
    }

    next()
};

export {
    validate,
   
    userValidator,
    loginValidator
};