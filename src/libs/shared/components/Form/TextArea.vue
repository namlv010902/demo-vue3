<template>
    <div class="mb-4">
      <label :for="name" class="block text-gray-700 font-medium mb-2">{{ label }}</label>
      <textarea
        :id="name"
        :name="name"
        v-bind="attrs"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      ></textarea>
      <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { ErrorMessage } from 'vee-validate';
  
  const props = defineProps({
    name: String,
    label: String,
  });
  const attrs = { ...props };
  </script>
  