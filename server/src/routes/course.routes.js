import express from 'express';
import { createCourse, 
         getCourses, 
         deleteCourse, 
         updateCourse
    } from '../controllers/course.controller.js';

const router = express.Router();

// POST: api/course/create
// create a new course
router.post('/create', createCourse)

// GET: api/course/search
// search course
router.get('/search', getCourses)

// PUT: api/course/update
// update course
router.put('/update/:id', updateCourse) 

// DELETE: api/course/delete
// delete course
router.delete('/delete/:id', deleteCourse)

export default router;