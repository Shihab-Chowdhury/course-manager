<template>
    <div>
    <header class="sticky top-0 z-50">
        <Nav />
    </header>
     <div class="overflow-x-auto">
        <div class="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div class="w-4/5 lg:w-5/6">
              <h1 class="font-semibold text-purple-400 text-xl" >Undergraduate Student's List</h1>
                <div class="bg-white shadow-md rounded my-6">
                    <table class="min-w-max w-full table-auto">
                        <thead class="">
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 md:px-6 px-0.5 text-left ">Student Id</th>
                                <th class="py-3 md:px-6 px-0.5 text-left ">Full Name</th>
                                <th class="py-3 md:px-6 px-0.5 text-center hidden xl:table-cell ">Department</th>
                                <th class="py-3 md:px-6 px-0.5 text-center hidden lg:table-cell ">Phone No.</th>
                                <!-- <th class="py-3 md:px-6 px-0.5 text-center hidden md:table-cell ">Assigned Advisor</th> -->
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm font-light">
                            <tr class="border-b border-gray-200 hover:bg-gray-100" @click="studentDetails(stu._id)" v-for="stu in this.studentList" :key="stu">
                                <!-- {{stu._id}} -->
                                <td class="py-3 md:px-6 px-0.5 text-left whitespace-nowrap">
                                    <div class="flex items-center mr-2 ml-2">
                                        <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{{stu._id.substring(stu._id.length - 7)}}</span>
                                    </div>
                                </td>
                                <td class="py-3 md:px-6 px-0.5  text-left">
                                    <div class="flex items-center ml-2">
                                        <span class="font-medium ">{{stu.name}}</span>
                                    </div>
                                </td>
                                <td class="py-3 md:px-6 px-0.5 hidden xl:table-cell text-center">
                                    <div class="flex items-center justify-center">
                                        <span class="font-medium">{{stu.department}}</span>
                                    </div>
                                </td>
                                <td class="py-3 md:px-6 px-0.5 hidden lg:table-cell text-center ">
                                    <span>{{stu.phone}}</span>                               
                                </td>
                                <!-- <td class="py-3 md:px-6 px-0.5 hidden md:table-cell text-center ">
                                    <div class="flex item-center justify-center">
                                        <span class="font-medium">{{stu.advisor}}</span>
                                    </div>
                                </td> -->
                            </tr>
                           
                        </tbody>
                    </table>
                </div>
                <div class="flex px-40 flex-row justify-center bg-regal-white" v-if="this.total>this.perPage">
              <VueTailwindPaginaiton  :current="currentPage" :total="total" :per-page="perPage" @page-changed="pageChange($event)" background="green-100"></VueTailwindPaginaiton>
            </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios"
import Nav from "../components/NavBar.vue";
import VueTailwindPaginaiton from '@ocrv/vue-tailwind-pagination';
import '@ocrv/vue-tailwind-pagination/dist/style.css'
    export default {
        components:{
            Nav,
            VueTailwindPaginaiton

        },
        mounted(){
            this.currentPage=1
            this.getStudent()
        },
       data(){
           return{
               total:0,
               perPage: 10,
               currentPage: 1,
               studentList:[]
           }
       },
       methods:{
          pageChange(pageNumber){
               this.currentPage=pageNumber
               this.getStudent(this.currentPage)
            },
           studentDetails(id) {
               console.log(id)
                this.$router.push({
                    name: 'StudentDetails',
                    params: {
                        id: id
                    }
                })
            },
           async getStudent(){        
                const response = await axios.get('student/search', {
                    params: {
                        page:this.currentPage,
                        limit:this.perPage,
                        q: this.text
                    },
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token') }`
                    }
                })
                this.studentList = response.data['result'];
                this.total=response.data.totalDocuments;
           }
       } 
    }
</script>

<style lang="scss" scoped>

</style>