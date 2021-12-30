<template>
    <div>
        <header class="sticky top-0 z-50">
        <Nav />
       </header>
        <!--main content-->
        <div class=" mt-10 px-10">
            <h1 class="font-semibold text-gray-600 text-2xl text-left mb-10">Spring 2021 Semester</h1>
            <div class="flex justify-between">
            <div>
            <h3 class="font-semibold text-purple-400 text-xl text-left mb-5 ">List Of Courses</h3>
            </div>
            <div>
            <button @click="backToDetails" class="border bg-purple-400 py-2 px-8 rounded text-white">Back</button>
            </div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap -mx-2 mt-5 px-10">
            <div class="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 mb-4 px-2" v-for="(course,index) in courseList" :key="index">
                <div class="relative bg-white rounded  shadow-lg border">
                    <div class="p-4">
                        <div class="flex justify-between">
                            <h3 class="text-lg font-bold text-left">{{course.code}}
                                <span class="text-sm"> - </span>
                                <span class="text-purple-600 text-sm mr-1">3.0</span>
                                <span class="text-gray-400 text-xs">credits</span>
                            </h3>
                            <!-- <button @click="addCourse(course.name,course.code,course.department,course.faculty)"> -->
                            <svg @click="addCourse(course.name,course.code,course.department,course.faculty)" class="w-4 h-4 fill-current text-purple-600" width="33" height="32" viewBox="0 0 33 32"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 16H1M17 32V16V32ZM17 16V0V16ZM17 16H33H17Z" stroke="#73C6CA"
                                    stroke-width="2" stroke-linecap="round" />
                            </svg>
                            <!-- </button> -->
                        </div>

                        <p class="block mb-2 text-sm text-gray-600 text-left">{{course.name}}</p>
                        <p class="text-sm mt-4 italic text-left mb-1">Class Schedule: </p>
                        <time class="block  font-semibold text-sm text-gray-600 text-left" >Monday, Tuesday</time>
                        <div class="text-left ">
                            <span
                                class="bg-purple-200 text-purple-600 py-1 px-2 rounded-full text-xs">09:00 - 09:40</span>
                        </div>
                        <p class="mt-4 text-left text-xs">
                           Lorem ipsum dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor   incididunt ut labore et dolore magna aliqua
                        </p>
                        <div class="flex mt-4">
                            <p class="block  font-semibold text-sm text-gray-400 text-left mr-2 ">Faculty:</p>
                            <p class="block mb-2 text-sm text-left text-purple-600 font-semibold">
                                {{course.faculty}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--main content-->


    </div>
</template>

<script>
    import axios from "axios"
    import swal from "sweetalert";
    import Nav from "../components/NavBar.vue";
    export default {
         components:{
            Nav
        },
        mounted() {
            this.getCourseList()
        },
        data() {
            return {
                courseList: [],
                //id:this.$router.params.id,
                courseAdded:{
                    courses:[]
                },
                addedCourse:{
                 name:'',
                 credit:0,
                 semester:'',
                 courseCode:'',
                 faculty:'',
                 day:[],
                 startTime:'',
                 endTime:'',
                 description:''
                },
                formData:{
                    name:'',
                    code:'',
                    department:'',
                    faculty:''
                }
            }
        },
        methods: {
            async getCourseList() {
                const response = await axios.get('course/search', {
                    // params: {
                    //     page:this.currentPage,
                    //     limit:this.perPage,
                    //     q: this.text
                    // },
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token') }`
                    }
                })
                this.courseList = response.data['result'];
            },
            backToDetails(){
                this.$router.push({
                name: 'StudentDetails',
                params: {
                id: this.$route.params.id
          }
        })
            },
            async addCourse(name,code,department,faculty){
               this.formData.name=name
               this.formData.code=code 
               this.formData.department=department
               this.formData.faculty=faculty
               this.courseAdded.courses.push(this.formData)
            await axios.patch('/student/addCourses/' + this.$route.params.id , this.courseAdded, {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token') }`
              }
            })
            .then((response) => {
              swal({
                title: "Success",
                text: "Courses Added Successfully!",
                icon: "success",
                timer: 1000,
                buttons: false
              }).then(function () {
                  new Promise(resolve => setTimeout(resolve, 2000));
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
        }
        }

    }
</script>

<style lang="scss" scoped>

</style>