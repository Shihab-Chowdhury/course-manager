import mongoose from "mongoose";
import { StudentModel } from "../models/student.model.js";

export const seedCourses = () => {
    
    const courses = [
        new CourseModel({
            name: "Basic Programming Language",
            code: "CSE110",
            department: "CSE",
            faculty: "Elon Musk"
        }),
    
        new CourseModel({
            name: "Advanced Programming Language",
            code: "CSE220",
            department: "CSE",
            faculty: "Jeff Bezos"
        }),
        
        new CourseModel({
            name: "Discrete Mathematics",
            code: "CSE230",
            department: "CSE",
            faculty: "Martin Szoboslai"
        }),
    ];

    const seedDB = async () => {
        await CourseModel.deleteMany({});
        await CourseModel.insertMany(courses);
    };

    // seedDB().then(() => {
    //     mongoose.connection.close();
    // })

}
