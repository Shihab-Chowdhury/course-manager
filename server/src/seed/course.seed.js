import { CourseModel } from "../models/course.model.js";

export const seedCourses = () => {
    console.log("hi");
    const courses = [
        new CourseModel({
            _id: "C001",
            name: "Basic Programming Language",
            code: "CSE110",
            department: "CSE",
            faculty: "Elon Musk"
        }),
    
        new CourseModel({
            _id: "C002",
            name: "Advanced Programming Language",
            code: "CSE220",
            department: "CSE",
            faculty: "Jeff Bezos"
        }),
        
        new CourseModel({
            _id: "C003",
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

    seedDB();
    // seedDB().then(() => {
    //     mongoose.connection.close();
    // })

}
