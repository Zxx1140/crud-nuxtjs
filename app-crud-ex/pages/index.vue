<template>
    <div class="container mx-auto ">
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
            <th class="px-2 py-3"> <NuxtLink :to="`/createUser`" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">CREATE USER</NuxtLink></th>
          </tr>
        </thead>
        <tbody>
           <tr v-for="(user, index) in displayedUsers" :key="user.user_id">
            <td class="border px-4 py-2">{{ user.user_id }}</td>
            <td class="border px-4 py-2">{{ user.user_fname }}</td>
            <td class="border px-4 py-2">{{ user.user_lname }}</td>
            <td class="border px-4 py-2">{{ user.user_email }}</td>
            <td class="border px-4 py-2"><img :src="user.user_img" class="h-12 w-12 rounded-full object-cover"></td>
            <td class="border px-4 py-2">
              <div class="flex justify-end my-4">
                <NuxtLink :to="`/${user.user_id}`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</NuxtLink>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteUser(user.user_id)">Delete</button>
              </div>
            </td>  
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
  
  const deleteUser = async (userId) => {
  await fetch(`http://localhost:1975/user/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId })
  })
  const index = users.value.findIndex(user => user.user_id === userId)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
}
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
  
  