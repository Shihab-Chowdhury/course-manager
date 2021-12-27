import courseRoutes from './course.routes.js';
import studentRoutes from './student.routes.js'

export const routes = (app) => {

    app.use('/api/course', courseRoutes);
    app.use('/api/student', studentRoutes);

};
