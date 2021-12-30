
<template>
  <div class="">
    <section class="flex flex-col md:flex-row h-screen justify-center mb-16 border border-purple-100">
      <!-- Body Starts -->
      <div class=" bg-white flex px-4 mt-10" >
        <div class="md:max-w-md md:mx-auto w-full flex">
          <div class="w-full mt-5 ">
          
            <h1 class="text-xl md:text-3xl font-bold leading-tight mt-2 text-left text-gray-700 mb-20">Log in to your account</h1>
               <!-- Login form starts -->
            <form  @submit.prevent="submitForm">

                <!-- Input email starts -->
                <div class="flex 2xl:-mr-12 -mx-1 mb-10">
                  <div class="w-full  mb-1 text-left">
                    <label for="" class="text-sm font-medium px-1  text-regal-teal">Email</label>
                    <div class="flex">
                      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                      <input v-model.trim="formData.email" type="email" @blur="v$.formData.email.$touch()" class="w-full -ml-10 h-11 py-2 pl-4 text-regal-teal rounded outline-none bg-purple-100" >
                    </div>
                    <small class="text-red-600 flex justify-start text-xs" v-if="v$.formData.email.$error">{{v$.formData.email.$errors[0].$message}}</small>
                  </div>
                </div>
                <!-- Input email ends -->

                <!-- Input password starts -->
                <div class="flex 2xl:-mr-12 -mx-1 mb-10">
                  <div class="w-full  mb-1 text-left">
                    <label for="" class="text-sm font-medium px-1  text-regal-teal">Password</label>
                    <div class="flex">
                      <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                      <input  type="password" class="w-full -ml-10 h-11 py-2 pl-4 rounded outline-none bg-purple-100" v-model="formData.password" @blur="v$.formData.password.$touch()">
                    </div>
                    <small class="text-red-600 flex justify-start text-xs" v-if="v$.formData.password.$error">{{v$.formData.password.$errors[0].$message}}</small>
                  </div>
                </div>
                <!-- Input password ends -->

                <!-- Button for creating new account -->
                <div class="flex justify-center -mx-1  2xl:-mr-12 mt-2 mb-5">
                  <div class="w-full mb-2">
                    <button class="block w-64 max-w-xs mx-auto text-white rounded-lg  py-3 font-semibold bg-purple-500"  @click="submitForm">Login</button>
                    <small class="text-red-600">{{this.err}}</small>
                  </div>
                </div>
                
                <hr>

                <!-- Button for login-->
                <div class="flex justify-center 2xl:-mr-12 -mx-1 mt-5">
                    <h3 class="text-sm mb-1 text-gray-700">Need An Account?</h3>
                    <router-link to="/register" class="text-purple-500 text-sm hover:text-purple-700 font-semibold">Create an account</router-link>
                  <!-- <router-link to="/" class="hover:text-indigo-800 text-blue-700" > Sign In Instead </router-link> -->
                </div>
            </form>
               <!-- Register form  ends -->

          </div>
        </div>

      </div>
      <!-- Body Ends -->

    </section>

  </div>
</template>

<script>
import axios from "axios"
import useValidate from '@vuelidate/core';
import {required,minLength,email} from '@vuelidate/validators';
    export default {
      data() {
        return {
            v$:useValidate(),
            err: '',
            formData: {
            email: '',
            password: '',
            },
        }
        },
     validations(){
     //const pattern =helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
     return{
      formData:{
      email:{required,email},
      password:{required,minLength: minLength(8)},
      }
     }
    },
    methods:
      {
        async submitForm() {
              this.v$.$touch()
              console.log("hjihihi")
              if (!this.v$.$error) {
                  await axios.post('user/login', this.formData, )
                  .then((response) => {
                  if (response.data.token) {
                      localStorage.setItem("token", response.data.token)
                  }
                  this.$router.push('/student-list');
                  })
                  .catch((error) => {
                  this.err = "Invalid Information"
                  console.log(error)
              })
            
              }  
            }
      }
        
    }
</script>

<style lang="scss" scoped>

</style>