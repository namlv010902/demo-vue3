<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <Form @submit="handleLogin" :validation-schema="schema" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <Field
            name="email"
            as="input"
            id="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <Field
            name="password"
            as="input"
            type="password"
            id="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
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
        <router-link to="/auth/register">Register</router-link>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { object, string } from "yup";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { AxiosError, type AxiosRequestConfig } from "axios";
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { instance } from "@/libs/utils/api";
import { APIQueryKey } from "@/libs/utils/api/vue-query";
import { setToken } from "@/libs/utils/auth";

type ResponseSuccess={
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
// Define validation schema with Yup
const schema = object({
  email: string().required("Email is required").email("Email is not valid"),
  password: string().required("Password is required"),
});

const router = useRouter();
const isLoading = ref(false);
const error = ref("");
const mutationFn = (data:any)=>{
 return instance.post<any>(APIQueryKey.LOGIN, data)
}
const {mutate}= useMutation({
  mutationFn,
  onSuccess:({data}:{data:ResponseSuccess})=>{
    console.log(data);
    setToken(data.data.accessToken,data.data.refreshToken)
    router.push("/");
    toast.success("Logged in successfully");
  },
  onError: (res) => {
 if(res instanceof AxiosError) toast.error(res.response?.data?.message);
  },
})
// Handle form submission
const handleLogin = async (values) => {
  console.log(values);
  mutate(values)
};
</script>

<style scoped></style>
