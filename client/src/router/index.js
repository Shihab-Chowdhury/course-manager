import { createRouter, createWebHashHistory } from 'vue-router'
import StudentList from '../views/StudentList.vue'
import StudentDetails from "../views/StudentDetails.vue";
import CourseList from "../views/CourseList.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/student-list',
    name: 'StudentList',
    component: StudentList
  },
  {
    path: '/student-details/:id',
    name: 'StudentDetails',
    component: StudentDetails
  },
  {
    path: '/course-list/:id',
    name: 'CourseList',
    component: CourseList
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router