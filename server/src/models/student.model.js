import mongoose from "mongoose";

// rules defined for attributes
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

const reqDate = {
    type:Date,
    required:true
};

const reqPhoneNumber = {
    type: String,
    required:true,
    minlength: 11,
    maxlength: 14
};

const CourseSchema = mongoose.Schema({

    name: reqString,
    code: reqString,
    department: reqString,
    faculty: opString
    
}, {timestamps:true});

const StudentSchema = mongoose.Schema({

    name: reqString,
    dob: reqDate,
    gender: reqString,
    phone: reqPhoneNumber,
    department: opString,
    courses: [CourseSchema]
    
}, {timestamps:true});

export const StudentModel = mongoose.model('Student', StudentSchema);