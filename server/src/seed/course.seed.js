import { CourseModel } from "../models/course.model.js";

export const seedCourses = () => {
    console.log("helo");
    const courses = [
        new CourseModel({
            _id: "61cc48aac554a65f954a41b3",
            name: "Basic Programming Language",
            code: "CSE110",
            department: "Computer Science and Engineering",
            faculty: "Elon Musk"
        }),
    
        new CourseModel({
            _id: "61cc48d4c554a65f954a41b6",
            name: "Advanced Programming Language",
            code: "CSE220",
            department: "Computer Science and Engineering",
            faculty: "Jeff Bezos"
        }),
        
        new CourseModel({
            _id: "61cc48eec554a65f954a41b9",
            name: "Discrete Mathematics",
            code: "CSE230",
            department: "Computer Science and Engineering",
            faculty: "Martin Szoboslai"
        }),

        new CourseModel({
            _id: "61cd3693b72dfd7b00bda15e",
            name: "Introduction to Anthropology",
            code: "ANT102",
            department: "Economics and Social Science",
            faculty: "John Element"
        }),

        new CourseModel({
            _id: "61cd36b8b72dfd7b00bda162",
            name: "Biological Anthropology",
            code: "ANT103",
            department: "Economics and Social Science",
            faculty: "Richard Long"
        }),

        new CourseModel({
            _id: "61cd36f0b72dfd7b00bda165",
            name: "Introduction to Computer Science",
            code: "CSE101",
            department: "Computer Science and Engineering",
            faculty: "Wayne Rooney"
        }),

        new CourseModel({
            _id: "61cd370ab72dfd7b00bda168",
            name: "Priciples of Economics",
            code: "ECO103",
            department: "Economics and Social Sciences",
            faculty: "Marta Ember"
        }),

        new CourseModel({
            _id: "61cd372eb72dfd7b00bda16b",
            name: "Priciples of Mathematics",
            code: "MAT111",
            department: "Mathematics and Natural Sciences",
            faculty: "Raymond Chang"
        }),

        new CourseModel({
            _id: "61cd3749b72dfd7b00bda16e",
            name: "Ethics and Culture",
            code: "HUM103",
            department: "Mathematics and Natural Sciences",
            faculty: "Julio Arboleda"
        }),

        new CourseModel({
            _id: "61cd3763b72dfd7b00bda171",
            name: "Analytic and Vector Geometry",
            code: "MAT122",
            department: "Mathematics and Natural Sciences",
            faculty: "Khosh Mohammad"
        }),
    ];

    const seedCourseDB = async () => {
        await CourseModel.deleteMany({});
        await CourseModel.insertMany(courses);
    };

    seedCourseDB();
    
    // seedDB().then(() => {
    //     mongoose.connection.close();
    // })

}
