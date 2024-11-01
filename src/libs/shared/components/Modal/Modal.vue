<template lang="html">
  <transition name="fade-scale">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gray-800 opacity-75"></div>

      <!-- Modal content -->
      <div
        class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative z-10 transform transition-all duration-300"
        @click.stop
      >
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <!-- Slot for modal content -->
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-enter,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
