import mongoose from "mongoose"

const reqString = {
    type: String,
    required:true,
    minlength:3,
    maxlength:255
};

const opString = {
    type: String,
    minlength:3,
    maxlength:255
};

const CourseSchema = mongoose.Schema({

    name: reqString,
    code: reqString,
    department: reqString,
    faculty: opString
    
}, {timestamps:true});

export const CourseModel = mongoose.model('Course', CourseSchema);
