<template lang="html">
    <aside
      class="w-64 bg-indigo-600 h-full text-white transition-transform transform duration-300 ease-in-out"
      :class="{ '-translate-x-full': !isSidebarOpen }"
    >
      <div class="p-4 text-xl font-semibold">
        Admin Panel
      </div>
      <nav class="mt-6">
        <ul>
          <li v-for="(link, index) in links" :key="index" class="px-4 py-2 hover:bg-indigo-700 transition-colors">
            <router-link :to="link.to" class="block">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script>
  export default {
    props: {
      isSidebarOpen: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        links: [
          { name: "Dashboard", to: "/" },
          { name: "Users", to: "/users" },
          { name: "Settings", to: "/settings" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  