import { CourseModel } from '../models/course.model.js'

let model = CourseModel;

//Create Course
export const createCourse = async (req, res, next) => {
    try {
        let {name} = req.body;
        name = name.trim();
        const checkDuplicate = await model.exists({
            $or:[
                {name}
            ]
        });
        if (checkDuplicate) {
            res.status(409);
            throw new Error(`Course '${name}' Already Exists`);
        }

        const result = await model.create(req.body);

        console.log(result);
        res.status(201).json({
            message:"Course Created.",
            status:"success",
            result: result,
        });
        next();

    } catch (error) {
        res.json({
            message: "Something Went Wrong!!",
            status:"failed",
            result: error.message
        });
        next(error.toString());
    }
};

//Get Courses
export const getCourses = async (req, res, next) => {
    try {
        const result = await model.find();
        console.log(result);
        res.status(200).json({
            total: result.length,
            message:'Displaying Results.',
            status: 'success',
            result: result
        });
        next();
    } catch (error) {
        res.json({
            message: "Something Went Wrong!!",
            status: "falied",
            result: error.message
        });
        next(error);
    } 
};

//Update Course
export const updateCourse = async (req, res, next) => {
    try {
        const result = await model.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true
        });
        res.status(200).json({
            message: "Course Updated.",
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

//Delete Course
export const deleteCourse = async (req, res, next) => {
    try {
        await CourseModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Course Deleted",
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