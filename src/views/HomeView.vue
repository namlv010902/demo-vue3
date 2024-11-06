<template>
  <div class="p-6">
    <!-- Search and Filter Section -->
    <form class="flex items-center space-x-4 mb-4" @submit.prevent="handleSearch">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search posts"
        class="border p-2 rounded w-1/2"
      />
      <select v-model="selectedCategory" class="border p-2 rounded">
        <option value="">All Categories</option>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
      </select>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Search
      </button>
    </form>

    <!-- Create Post Button & Modal -->
    <div>
      <button @click="showModal = true" class="px-4 py-3 rounded bg-blue-600 hover:bg-blue-800 text-white">
        Create post
      </button>
      <Modal :isOpen="showModal" @close="showModal = false">
        <PostForm  :id="postId" :refetch="refetch" />
      </Modal>
    </div>
  
    <!-- Posts Table -->
    <table class="min-w-full bg-white border rounded shadow-md">
      <thead class="bg-indigo-600 text-white">
        <tr>
          <th class="p-4 text-left">#</th>
          <th class="p-4 text-left">Title</th>
          <th class="p-4 text-left">Content</th>
          <th class="p-4 text-left">Image</th>
          <th class="p-4 text-left">Category</th>
          <th class="p-4 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in data?.data" :key="post.id" class="hover:bg-gray-100 border-b">
          <td class="p-4">{{ index + 1 }}</td>
          <td class="p-4">{{ post.title }}</td>
          <td class="p-4">{{ post.content }}</td>
          <td class="p-4">
            <img :src="post.image" alt="Image" class="w-10 h-10 rounded" />
          </td>
          <td class="p-4">{{ post.category.name }}</td>
          <td class="p-4">
            <button class="text-red-500 hover:text-red-700" @click="handelDelete(post.id)">Delete</button>
            <button class="text-blue-500 hover:text-blue-700 ml-2" @click="handelEdit(post.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import Modal from "@/libs/shared/components/Modal/Modal.vue";
import { APIQueryKey } from '@/libs/utils/api/vue-query';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { ref, computed } from 'vue';
import ModalAddPost from './ModalAddPost.vue';
import PostForm from "./posts/components/PostForm.vue";
import { deleteApi } from "@/libs/utils/api/api";
import { toast } from "vue3-toastify";
import { AxiosError } from "axios";

const showModal = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');
const isSubmit = ref(false);
const postId = ref(0);
// Query to fetch posts with dynamic queryKey
const { data, refetch } = useQuery({
  queryKey: computed(() => [
    APIQueryKey.POSTS,
    { keyWord: searchQuery.value || undefined, categoryId: selectedCategory.value || undefined }
  ]),
});
const mutationFn =(id:number)=>{
  return deleteApi({
    urlKey: 'POSTS',
    id
  });
}
const { isLoading, isError, isSuccess, mutate } = useMutation({
  mutationFn,
  onSuccess: (res) => {
  if(res)  toast.success(res.data?.message);
  refetch();
  },
  onError: (res) => {
 if(res instanceof AxiosError) toast.error(res.response?.data?.message);
  },
});
// Search handler
const handleSearch =()=>{
  console.log(123);
  
}
const handelEdit =(id:number)=>{
  postId.value = id;
  console.log("id ",id);
  showModal.value = true;
}
const handelDelete =(id:number)=>{
  console.log("id ",id);
  mutate(id);
 // Delete post here
}

</script>

<style scoped></style>
