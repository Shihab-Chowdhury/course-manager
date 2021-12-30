<template>
    <div class="">
        <nav class="bg-purple-100 shadow" >
            <div class="container px-6 py-3 mx-auto">
                <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <a class="text-xl font-semibold text-gray-600 dark:text-white lg:text-xl hover:text-gray-700 dark:hover:text-gray-400"
                                href="#" >XYZ UNIVERSITY</a>

                        </div>

                        <!-- Mobile menu button -->
                        <div class="flex md:hidden">
                            <button type="button" @click="toggle"
                                class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                aria-label="toggle menu">
                                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                    <path fill-rule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="items-center md:flex">
                        <div>
                            <div class="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1" v-show="isOpen">
                                <router-link to="/" @click="logout"
                                    class="my-1 text-md font-semibold text-GRAY-500 leading-5  md:mx-4 md:my-0 hover:text-regal-teal hover:underline">
                                    Logout
                                </router-link>
                            </div>
                        </div> 
                        <!-- Search input on mobile screen -->
                        <div class="mt-3 md:hidden hidden">
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round"></path>
                                    </svg>
                                </span>

                                <input type="text"
                                    class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    placeholder="Search">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: true,
            }
        },
        methods: {
            toggle: function () {
                this.isOpen = !this.isOpen
            },
            logout() {
                localStorage.clear()
            },
        }
    }
</script>

<style scoped>
</style>