import { StudentModel } from "../models/student.model.js";

let model = StudentModel;

// Create a new student
export const createStudent = async (req, res, next) => {
    try {
        
        let {name, dob, phone} = req.body;
        name = name.trim();
        dob = dob.trim();
        phone = phone.trim();
        
        const checkDuplicate = await model.exists({
            $or:[
                {name},
                {dob},
                {phone}
            ]
        });
        if (checkDuplicate) {
            res.status(409);
            throw new Error(`Student Already Exists`);
        }
        
        let result = await model.create(req.body);
        res.status(201).json({
            message: "Student Created.",
            result: result
        });
        next();

    } catch (error) {
        res.json({
            message: "Something went wrong!!",
            error: error.message
        });
        next(error);
    }
};

// Get a student
export const getOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result  = await model.findById(id)
        // .populate({path: 'copies.courses', select: 'name code department faculty'});
        res.status(200).json({
            message: "Displaying Results.",
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

// Return the list of students, optionally with pagination
export const getStudents = async (req, res, next) => {
    try {                      
        const pagesCount = await model.countDocuments();
        const { page = 1, limit = 10 } = req.query;
        const result = await model.find()
            // .populate({path: 'copies.courses', select: 'name code department faculty'})
            .limit(limit * 1)
            .skip((page - 1) * limit)                       //(page-1) isn't required if page value starts from 0  
            .sort({_id: 'desc'});                           //Sorting in descending order by objectId (desc, asc)
        res.status(200).json({
            total: result.length,
            totalDocuments: pagesCount,
            message:'Displaying Results.',
            result: result
        });        
        next();
    } catch (error) {        
        res.status(400).json({
            message: 'Something Went Wrong!!',
            error: error.message
        });
        next(error);                                         
    }
};

// Add course for the student
export const addCourse = async (req, res, next) => {
    try {

        // console.log(req.body.courses[0]);
        let {code} = req.body.courses[0];
        console.log(code);
        code = code.trim();
        
        const checkDuplicate = await model.exists({
            $or:[
                {code}
            ]
        });
        if (checkDuplicate) {
            res.status(409);
            throw new Error(`Course has already been taken please choose another course`);
        }
        
        const { id } = req.params;
        const { courses } = req.body;
        const add = await model.find({ _id: id, courses: { $in : courses}})   
        .select("courses")

        if (add.length == 0) {
            await model.findByIdAndUpdate(id, {
                "$push": {courses: {"$each": courses}}
            });

            res.status(201).json({
                message:"Course Added.",
                result: courses
            });
            next();
        } else {
            const [cr] = add;
            let existingCourses = cr.courses;
            let duplicate = existingCourses.filter(v => courses.some (u => ( u == v)))
            if (duplicate.length > 0) {
                throw new Error (`You have already taken ${duplicate}`);
            }             
        }
    } catch (error) {
        res.json({
            message:"Something Went Wrong!!",
            error: error.message
        });
        next();
    }
}

// Remove course for the student
export const removeCourse = async (req, res, next) => {
    try {
        let { courses } = req.body;
        const { id } = req.params;
        let oneCourse = courses[0];
        console.log(oneCourse);
        const removeCourse = await model.findByIdAndUpdate(
            id, 
            {
                $pull: {
                    courses: oneCourse
                }
            }, 
            {
                new: true
            });

        res.status(201).json({
            message:"Course Removed.",
            result: removeCourse.courses
        });
        next();
    } catch (error) {

        res.status(201).json({
            message:"Something Went Wrong!!",
            error: error.message
        });

        next(error);
    }
}

// Update student details
export const updateStudent = async (req, res, next) => {
    try {
        const result = await model.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        res.status(200).json({
            message: "Student Updated.",
            status: "success",
            result: result
        });
        next();
    } catch (error) {
        res.json({
            message : "Something Went Wrong!!",
            status: "failed",
            error: error.message
        });
        next(error);
    }
};

// Delete student
export const deleteStudent = async (req, res, next) => {
    try {
        await model.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Student Deleted",
            status:"success"
        })
        next();

    } catch (error) {
        res.json({
           message : "Something Went Wrong!!",
           status:"failed",
           error: error.message
        });
        next(error);
    }  
};







