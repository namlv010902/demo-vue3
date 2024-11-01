<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-red-600">403</h1>
        <p class="mt-4 text-xl text-gray-700">You do not have permission to access this page.</p>
        <p class="mt-2 text-gray-500">Please check your access rights or return to the home page.</p>
        <router-link to="/auth/login" class="mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Return Login
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Forbidden',
  };
  </script>
  
  <style scoped>
  </style>
  