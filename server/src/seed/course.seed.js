import { CourseModel } from "../models/course.model.js";

export const seedCourses = () => {
    console.log("helo");
    const courses = [
        new CourseModel({
            _id: "61cc48aac554a65f954a41b3",
            name: "Basic Programming Language",
            code: "CSE110",
            department: "CSE",
            faculty: "Elon Musk"
        }),
    
        new CourseModel({
            _id: "61cc48d4c554a65f954a41b6",
            name: "Advanced Programming Language",
            code: "CSE220",
            department: "CSE",
            faculty: "Jeff Bezos"
        }),
        
        new CourseModel({
            _id: "61cc48eec554a65f954a41b9",
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
