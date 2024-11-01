<template lang="html">
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <SideBar :isSidebarOpen="isSidebarOpen" />

    <!-- Main content -->
    <div
      class="flex flex-col flex-1 transition-all duration-300"
      :class="{ 'ml-0': isSidebarOpen, 'ml-[-16rem]': !isSidebarOpen }"
    >
      <!-- Header -->
      <Header :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

      <!-- Main content area -->
      <main class="flex-1 p-6 overflow-y-auto bg-gray-50">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    Header,
    SideBar,
    Footer,
  },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.$store.dispatch('getMe');
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>