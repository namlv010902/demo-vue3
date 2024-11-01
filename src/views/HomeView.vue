<template>
  <div class="p-6">
    <!-- Search and Filter Section -->
    <div class="flex items-center space-x-4 mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search posts"
        class="border p-2 rounded w-1/2"
      />
      <select
        v-model="selectedCategory"
        class="border p-2 rounded"
      >
        <option value="">All Categories</option>
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
      </select>
      <button
        @click="filterPosts"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
 
    <div>
      <button @click="showModal = true" class="px-4 py-3 rounded bg-blue-600 hover:bg-blue-800 text-white">Create post</button>
      <Modal :isOpen="showModal" @close="showModal = false">
      <h2 class="text-2xl font-bold mb-4">Modal Title</h2>
      <p class="text-gray-700">
        <input
        type="text"
        v-model="searchQuery"
        placeholder="Search posts"
        class="border p-2 rounded w-1/2"
      />
      </p>
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
        <tr v-for="(post, index) in filteredPosts" :key="index" class="hover:bg-gray-100 border-b">
          <td class="p-4">{{ index + 1 }}</td>
          <td class="p-4">{{ post.title }}</td>
          <td class="p-4">{{ post.content }}</td>
          <td class="p-4"><img :src="post.image" alt="Image" class="w-10 h-10 rounded" /></td>
          <td class="p-4">{{ post.category.name }}</td>
          <td class="p-4">
            <button class="text-red-500 hover:text-red-700">Delete</button>
            <button class="text-blue-500 hover:text-blue-700 ml-2">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Modal from "@/libs/shared/components/Modal/Modal.vue";
import { request } from "@/libs/utils/api";

export default {
  components:{
    Modal,
  },
  data() {
    return {showModal: false,
      posts: [],
      searchQuery: "",
      selectedCategory: "",
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedCategory === "" || post.category === this.selectedCategory)
        );
      });
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      request.get("/posts").then((response) => {
        this.posts = response.data.data;
        console.log(this.posts);
        
      });
    },
    filterPosts() {
      this.fetchPosts();
    },
  },
};
</script>

<style scoped>
</style>
