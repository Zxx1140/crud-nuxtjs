<template>
    <div class="container mx-auto ">
      <input v-model="searchTerm" type="text" placeholder="Search by first name" 
    class="mx-auto mt-5 bg-white border border-gray-500 rounded-lg py-2 px-4 block w-60">
      <table class="mt-5 table-auto mx-auto">
        <thead>
          <h2> {{ route.params.id }}</h2>
          <tr>
            <th class="px-4 py-2">Product ID</th>
            <th class="px-4 py-2">Product Name</th>
            <th class="px-4 py-2">Image</th>
            <th class="px-2 py-3"> <NuxtLink :to="`/products/createItem-${route.params.id}`" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">CREATE Item</NuxtLink></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, items) in displayedItems " :key="item.item_id">
            <td class="border px-4 py-2">{{ item.item_id }}</td>
            <td class="border px-4 py-2">{{ item.item_name }}</td>
            <td class="border px-4 py-2"><img :src="item.item_img" class="h-16 w-16 rounded-full object-cover"></td> 
            <td class="border px-4 py-2">
              <div class="flex justify-end my-4">
               
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="deleteItem(item.item_id)">Delete</button>
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
  
  import { ref, onMounted , computed} from 'vue'
  const route = useRoute()
  const items = ref([])
  const itemsPerpage = 5
  const currentPage = ref(0)
  const searchTerm = ref('')
  
  const getItems = async () => {
    const response = await fetch('http://localhost:1975/item/'+route.params.id)
    const data = await response.json()
    items.value = data
  }
  const deleteItem = async (itemId) => {
  await fetch(`http://localhost:1975/item/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId })
  })
  const index = users.value.findIndex(user => user.user_id === userId)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
  }
  onMounted(getItems)

  const numberOfPages = computed(() =>{
    return Math.ceil(filteredItems.value.length / itemsPerpage)
  })
 
  const filteredItems = computed(()=>{
    return items.value.filter(item => item.item_name.toLowerCase().includes(searchTerm.value.toLowerCase()))
  })
  const displayedItems = computed(()=>{
    const start = currentPage.value * itemsPerpage
    const end = start + itemsPerpage
    return filteredItems.value.slice(start, end)
  })

  </script>
  
  