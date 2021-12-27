import express from 'express';
import { addCourse,
         removeCourse, 
         createStudent,
         getOneStudent, 
         getStudents
         
    } from '../controllers/student.controller.js';

const router = express.Router();

// POST: api/student/create
// create a new student
router.post('/create', createStudent)

// PATCH: api/student/addCourses
// add one or multiple courses
router.patch('/addCourses/:id', addCourse)

// PATCH: api/student/removeCourses
// remove course
router.patch('/removeCourse/:id', removeCourse)

// GET: api/student/search/:id
// search one student
router.get('/search/:id', getOneStudent)

// GET: api/student/search
// search students
router.get('/search', getStudents)

// // GET: api/student/search
// // search student
// router.get('/search', getStudents)

// // PUT: api/student/update
// // update student
// router.put('/update/:id', updateStudent) 

// // DELETE: api/student/delete
// // delete student
// router.delete('/delete/:id', deleteStudent)

export default router;