<script setup>
import { reactive, onMounted } from 'vue'

const route = useRoute()

const form = reactive({
  user_fname: '',
  user_lname: '',
  user_email: '',
  user_img: null,
})

const setEntry = async () => {
  const response = await fetch('http://localhost:1975/users')
  const data = await response.json()
  
  if('entry' in data) {
    form.user_fname = data.entry.user_fname
    form.user_lname = data.entry.user_lname
    form.user_email = data.entry.user_email

  
  }
}

onMounted()

const createUser = async () => {
  await useFetch('http://localhost:1975/user/create', {
    method: 'POST',
    body: {
      user_fname: form.user_fname,
      user_lname: form.user_lname,
      user_email: form.user_email,
      user_img:   form.user_img,
     
    }
  })
  location.assign('/')
}
</script>

<template>
  <form @submit.prevent="createUser" class="w-full max-w-md mx-auto">
    <h3 class="text-lg font-semibold mb-4">Edit User </h3>
    <div class="flex flex-wrap mb-2">
      <div class="w-full md:w-1/2 md:pr-2 mb-2 md:mb-0">
        <label class="block text-gray-700 font-bold mb-2">First name</label>
        <input type="text" v-model="form.user_fname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="w-full md:w-1/2 md:pl-2">
        <label class="block text-gray-700 font-bold mb-2">Last name</label>
        <input type="text" v-model="form.user_lname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
    </div>
    <div class="mb-2">
      <label class="block text-gray-700 font-bold mb-2">Email address</label>
      <input type="email" v-model="form.user_email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
    </div>
    <div class="mb-2">
      <label class="block text-gray-700 font-bold mb-2">IMAGE</label>
      <input type="text" v-model="form.user_img" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
    </div>
    <div class="flex items-center">
      <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-1">Create</button>
      <nuxt-link to="/" class="ml-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-yellow-800" >Go Back</nuxt-link>
    </div>
  </form>
</template>