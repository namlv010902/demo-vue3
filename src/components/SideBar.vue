<template>
  <aside
    class="w-64 bg-indigo-600 h-full text-white transition-transform transform duration-300 ease-in-out"
    :class="{ '-translate-x-full': !isSidebarOpen }"
  >
    <div class="p-4 text-xl font-semibold flex justify-center">
      <img :src="logo" alt="Logo" :width="100" />
    </div>
    <nav class="mt-4">
      <ul>
        <li
          v-for="(link, index) in links"
          :key="index"
          class="px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer"
          :class="{ 'bg-indigo-700 font-semibold': isActive(link.to) }"

        >
          <router-link :to="link.to" class="block">
            <Icon icon="home" /> {{ link.name }}
          </router-link>
        </li>
        <li
          class="px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer"
          @click="logout()"
        >
          Logout
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Logo from '../assets/img/logo.webp';
import Icon from '../libs/shared/components/Icons/Icon.vue';
import { logout } from '@/libs/utils/auth';

// Define props
const props = defineProps<{
  isSidebarOpen: boolean;
}>();
const isActive = (linkPath: string) => {
  return route.path === linkPath;
};
// Local data
const logo = ref(Logo);
const links = ref([
  { name: 'Dashboard', to: '/' },
  { name: 'Users', to: '/users' },
  { name: 'Settings', to: '/settings' },
]);
const route = useRoute();
// Define logout action

</script>

<style scoped></style>
