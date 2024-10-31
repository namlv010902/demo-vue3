<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            id="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <span v-if="errorEmail" class="text-red-500 text-sm">{{ errorEmail }}</span>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <span v-if="errorPassword" class="text-red-500 text-sm mt-2">{{ errorPassword }}</span>
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Login</span>
        </button>
        <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';


export default {
  data() {
    return {
      errorEmail:'',
      errorPassword:'',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
     
      try {
      this.errorEmail = '';
      this.errorPassword = '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email) {
        this.errorEmail = 'Email is required';
      } else if (!emailPattern.test(this.email)) {
        this.errorEmail = 'Email is not a valid email';
      }

      if (!this.password) {
        this.errorPassword = 'Password is required';
      }

      if (this.errorEmail || this.errorPassword) {
        return; 
      }
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
        toast.success('Login successful')
        this.$router.push({
          path:'/'
        });
      } catch (error) {
        console.log(error);
      if(error instanceof AxiosError)  toast.error(error?.response?.data?.message)
      }
    },
  },
};

</script>

<style scoped>
</style>