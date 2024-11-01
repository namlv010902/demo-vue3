<template lang="html">
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-gray-800">404</h1>
        <p class="text-2xl md:text-3xl font-medium mt-4 text-gray-600">
          Oops! Page not found
        </p>
        <p class="mt-2 text-gray-500">
          The page you're looking for doesn't exist.
        </p>
        <router-link to="/" class="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Go back home
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFoundPage",
  };
  </script>
  
  <style scoped>
  </style>
  