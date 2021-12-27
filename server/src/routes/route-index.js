import userRoutes from './user.routes.js'
import courseRoutes from './course.routes.js';
import studentRoutes from './student.routes.js'

export const routes = (app) => {

    app.use('/api/user', userRoutes);
    app.use('/api/course', courseRoutes);
    app.use('/api/student', studentRoutes);

};
