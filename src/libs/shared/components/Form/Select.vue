<template>
    <div class="mb-4">
      <label :for="name" class="block text-gray-700 font-medium mb-2">{{ label }}</label>
      <select
        :id="name"
        :name="name"
        v-bind="attrs"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="" disabled>Select an option</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
      <ErrorMessage :name="name" class="text-red-500 text-sm mt-1" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { ErrorMessage } from 'vee-validate';
  
  const props = defineProps({
    name: String,
    label: String,
    options: {
      type: Array,
      default: () => [],
    },
  });
  const attrs = { ...props };
  </script>
  