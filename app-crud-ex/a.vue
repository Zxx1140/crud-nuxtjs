<template>
    <div class="container mx-auto ">
      <table class="mt-5 table-auto mx-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">User ID</th>
            <th class="px-4 py-2">First Name</th>
            <th class="px-4 py-2">Last Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            
            <td class="border px-4 py-2">{{ user.user_id }}</td>
            <td class="border px-4 py-2">{{ user.user_fname }}</td>
            <td class="border px-4 py-2">{{ user.user_lname }}</td>
            <td class="border px-4 py-2">{{ user.user_email }}</td>
            <NuxtLink :to="`/products/productList-${user.user_id}`">
            <td class="border px-4 py-2"><img :src="user.user_img" class="h-16 w-16 rounded-full object-cover"></td> 
            </NuxtLink>      
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 flex justify-center">
      <pagination :pages="totalPages" :currentPage="pagination.currentPage" @change="onChangePage" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const users = ref([])
  
  const getUsers = async () => {
    const response = await fetch('http://localhost:1975/users')
    const data = await response.json()
    users.value = data
  }
  
  onMounted(getUsers)
  
  </script>
  
  