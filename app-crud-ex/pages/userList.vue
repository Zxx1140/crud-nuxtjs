<template>
  <div class="container mx-auto">
    <input v-model="searchTerm" type="text" placeholder="Search by first name" 
    class="mx-auto mt-5 bg-white border border-gray-500 rounded-lg py-2 px-4 block w-60">
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
        <tr v-for="(user, index) in displayedUsers" :key="user.user_id">
          <td class="border px-4 py-2">{{ user.user_id }}</td>
          <td class="border px-4 py-2">{{ user.user_fname }}</td>
          <td class="border px-4 py-2">{{ user.user_lname }}</td>
          <td class="border px-4 py-2">{{ user.user_email }}</td>
          <NuxtLink :to="`/products/productList-${user.user_id}`">
            <td class="border px-4 py-2">
              <img :src="user.user_img" class="h-16 w-16 rounded-full object-cover">
            </td>
          </NuxtLink>
        </tr>
      </tbody>
    </table>
<div class="flex justify-center my-4">
  <button class="mx-2 px-3 py-1 rounded-lg border" :disabled="currentPage === 0" @click="currentPage--">
    Previous
  </button>

  <button class="mx-2 px-3 py-1 rounded-lg border" :disabled="currentPage >= numberOfPages - 1" @click="currentPage++">
    Next
  </button>
</div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'

const usersPerPage = 5
const currentPage = ref(0)
const searchTerm = ref('')

const users = ref([])

const getUsers = async () => {
  const response = await fetch('http://localhost:1975/users')
  const data = await response.json()
  users.value = data
}

onMounted(getUsers)

const numberOfPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / usersPerPage)
})

const filteredUsers = computed(() => {
  return users.value.filter(user => user.user_fname.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

const displayedUsers = computed(() => {
  const start = currentPage.value * usersPerPage
  const end = start + usersPerPage
  return filteredUsers.value.slice(start, end)
})
</script>