import { seedCourses } from "./course.seed.js"
import { seedtudents } from "./student.seed.js"
import { seedUser } from "./user.seed.js"

export const seed = () => {
    seedCourses();
    seedtudents();
    seedUser();
};