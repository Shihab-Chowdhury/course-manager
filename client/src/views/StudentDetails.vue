<template>
  <div>
    <header class="sticky top-0 z-50">
        <Nav />
    </header>
    <div class="container mx-auto p-8">
      <div class="flex justify-between">
      <div>
      <h1 class="font-semibold text-purple-400 text-3xl text-left mb-10">Spring 2021</h1>
      </div>
      <div>
      <router-link to="/student-list" @click="backToDetails" class="border bg-purple-400 py-3 px-8 rounded text-white">Back to list</router-link>
      </div>
      </div>
      <!--syudent info-->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 text-left">
            Student Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500 text-left">
            Personal information and course details.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{student.name}}
              </dd>
            </div>
            <!-- <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Student Id
              </dt>
              <dd class="mt-1 text-sm text-purple-600 font-semibold sm:mt-0 sm:col-span-2">
             {{student._id.substring(student._id.length - 7)}}
              </dd>
            </div> -->
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Gender
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{student.gender}}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{student.phone}}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Department
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{student.department}}
              </dd>
            </div>
             <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Advisor
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Robbie Williams
              </dd>
            </div>
          </dl>
        </div>
        <div class="px-4 py-5 sm:px-6 flex justify-between">
          <h3 class="text-lg leading-6 font-medium text-gray-900 text-left mt-10 mb-5">
            Course Details
          </h3>
          <div class="mt-10">
            <!-- <router-link to="/course-list"
          class="border rounded-full py-2 px-2 border-purple-400 bg-purple-200 text-xs text-gray-700 flex">
       + Add More Courses</router-link> -->
            <button @click="courseLists()"
              class="border rounded-full py-2 px-2 border-purple-400 bg-purple-200 text-xs text-gray-700 flex">
              <span class="mt-0.5">
                + Add More Courses
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-wrap -mx-2 mt-0.5">
        <div class="w-full sm:w-1/2 md:w-1/3 mb-4 px-2" v-for="(course,index) in this.student.courses" :key="index">
          <div class="relative bg-white rounded  shadow-lg border">
            <div class="p-4">
              <div class="flex justify-between">
              <h3 class="text-lg font-bold text-left">{{course.code}}
                <span class="text-sm"> - </span>
                <span class="text-purple-600 text-sm mr-1">3.0</span>
                <span class="text-gray-400 text-xs">credits</span>
              </h3>
               <svg @click="deleteCourses(course.name)" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.63318 2.63465C6.14483 -0.876262 11.8558 -0.876262 15.3674 2.63465C18.8775 6.14555 18.8775 11.858 15.3674 15.3689C13.6116 17.1239 11.3058 18.0011 8.9999 18.0011C6.69405 18.0011 4.389 17.1239 2.63318 15.3689C-0.877727 11.858 -0.877727 6.14555 2.63318 2.63465ZM5.28644 11.6546C4.99306 11.948 4.99306 12.4222 5.28644 12.7156C5.43275 12.8619 5.62483 12.9355 5.81695 12.9355C6.00902 12.9355 6.20114 12.8619 6.34746 12.7156L8.99994 10.0624L11.6517 12.7148C11.7987 12.8612 11.9909 12.9347 12.1822 12.9347C12.3743 12.9347 12.5664 12.8612 12.7127 12.7148C13.0061 12.4215 13.0061 11.9465 12.7127 11.6539L10.061 9.00137L12.7134 6.34889C13.0068 6.05551 13.0068 5.58054 12.7134 5.2879C12.4208 4.99453 11.9458 4.99453 11.6525 5.2879L8.99997 7.94038L6.34749 5.2879C6.05412 4.99453 5.57988 4.99453 5.28651 5.2879C4.99313 5.58054 4.99313 6.05551 5.28651 6.34889L7.93899 9.00137L5.28644 11.6546Z" fill="#FE646F"/>
              </svg>
              </div>
              <p class="block mb-2 text-sm text-gray-600 text-left">{{course.name}}</p>
              <p class="block mb-2 text-xs text-gray-500 text-left">{{course.department}}</p>
              <p class="text-sm mt-4 italic text-left mb-1">Class Schedule: </p>
              <time class="block  font-semibold text-sm text-gray-600 text-left">Monday, Tuesday</time>
              <div class="text-left ">
                <span
                  class="bg-purple-200 text-purple-600 py-1 px-2 rounded-full text-xs">09:00 - 09:40</span>
              </div>
              <p class="mt-4 text-left text-xs">
                Lorem ipsum dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor   incididunt ut labore et dolore magna aliqua
              </p>
              <div class="flex mt-4">
                <p class="block  font-semibold text-sm text-gray-400 text-left mr-2 ">Faculty: </p>
                <p class="block mb-2 text-sm  text-left text-purple-600 font-semibold">{{course.faculty}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  import Nav from "../components/NavBar.vue";
  import swal from "sweetalert";
  export default {
     components:{
            Nav
        },
   
    created() {
      this.getSpecificStudent()
    },
    data() {
      return {
        student: [],
         courseRemoved:{
            courses:[]
          },
           formData:{
            name:'',
        }
      }
    },
    methods: {
      async getSpecificStudent() {
                await axios.get('student/search/' + this.$route.params.id, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token') }`
                        }
                    })
                    .then((response) => {
                        this.student= response.data.result;
                    })
                    .catch((error) => {
                        console.log(error)
                    })
      },
      async deleteCourses(name){
        //id=this.$route.params.id
        this.formData.name=name
           this.courseRemoved.courses.push(this.formData)
           await axios.patch('/student/removeCourse/' + this.$route.params.id , this.courseRemoved, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token') }`
              }
            })
            .then((response) => {
              swal({
                title: "Success",
                text: "Courses Removed Successfully!",
                icon: "success",
                timer: 1000,
                buttons: false
              }).then(function () {
                  new Promise(resolve => setTimeout(resolve, 2000));
                  window.location.reload()
                  //window.location = `/student-details/${id}`;
               })
              console.log(response);
            })
            .catch((error) => {
              console.log(error)
            })
               this.$router.push({
                    name: 'StudentDetails',
                    params: {
                        id: this.$route.params.id
                    }
                })
      },
      courseLists() {
        this.$router.push({
          name: 'CourseList',
          params: {
            id: this.$route.params.id
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>