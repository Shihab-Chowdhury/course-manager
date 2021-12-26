import courseRoutes from './course.routes.js';


export const routes = (app) => {

    app.use('/api/course', courseRoutes);

};
