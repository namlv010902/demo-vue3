<template lang="html">
    <header class="flex items-center justify-between p-4 bg-white shadow">
      <button @click="$emit('toggleSidebar')" class="p-2 text-indigo-600">
        <span v-if="!isSidebarOpen">☰</span>
        <span v-else>✕</span>
      </button>
      <h1 class="text-lg font-semibold text-gray-700">Dashboard</h1>
    </header>
  </template>
  
  <script>
  export default {
    props: {
      isSidebarOpen: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  