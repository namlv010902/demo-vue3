<template lang="html">
  <aside
    class="w-64 bg-indigo-600 h-full text-white transition-transform transform duration-300 ease-in-out"
    :class="{ '-translate-x-full': !isSidebarOpen }"
  >
    <div class="p-4 text-xl font-semibold flex justify-center">
      <img :src="Logo" alt="" srcset="" :width="100" />
    </div>
    <nav class="mt-4">
      <ul>
        <li
          v-for="(link, index) in links"
          :key="index"
          class="px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <router-link :to="link.to" class="block">
            <Icon icon="home" /> {{ link.name }}
          </router-link>
        </li>
        <li
          class="px-4 py-2 hover:bg-indigo-700 transition-colors cursor-pointer"
          @click="useLogOut"
        >
          Logout
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import Logo from "../assets/img/logo.webp";
import useLogOut from "../libs/hooks/use-logout";
import Icon from "../libs/shared/components/Icons/Icon.vue";
export default {
  components: {
    Icon,
  },
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      Logo,
      useLogOut,
      links: [
        { name: "Dashboard", to: "/" },
        { name: "Users", to: "/users" },
        { name: "Settings", to: "/settings" },
      ],
    };
  },
};
</script>

<style scoped></style>
