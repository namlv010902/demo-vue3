<template>
    <div class="mb-4">
      <label :for="name" class="block text-gray-700 font-medium mb-2">{{ label }}</label>
      <input
        :id="name"
        :name="name"
        :type="type"
        v-bind="attrs"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { ErrorMessage } from 'vee-validate';
  
  const props = defineProps({
    name: String,
    label: String,
    type: {
      type: String,
      default: 'text',
    },
  });
  const attrs = { ...props };
  </script>
  