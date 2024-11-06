<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
   
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
<div class="flex justify-center">      <img :src="Logo" alt="" srcset="" :width="50" /></div>
      <h1 class="text-2xl font-bold text-center mb-6">Register</h1>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div class="mb-4" v-for="(field, index) in fields" :key="index">
          <label
            :for="field.id"
            class="block text-sm font-medium text-gray-700"
            >{{ field.label }}</label
          >
          <Field
            v-model="form[field.model]"
            :name="field.model"
            :type="field.type"
            :id="field.id"
            :placeholder="field.placeholder"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <ErrorMessage :name="field.model" class="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Registering...</span>
          <span v-else>Register</span>
        </button>
        <p v-if="error" class="text-red-500 text-sm mt-4">{{ error }}</p>
        <router-link to="/auth/login">Login</router-link>
      </Form>
    </div>
  </div>
</template>

<script >
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { toast } from "vue3-toastify";
import { instance } from "@/libs/utils/api";
import { AxiosError } from "axios";
import Logo from '../../assets/img/logo.webp'

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      Logo,
      form: {
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
      isLoading: false,
      schema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        phoneNumber: Yup.string().required("Phone number is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      }),
    };
  },
  computed: {
    fields() {
      return [
        {
          id: "name",
          model: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        {
          id: "phoneNumber",
          model: "phoneNumber",
          label: "Phone Number",
          type: "text",
          placeholder: "Enter your phone number",
        },
        {
          id: "email",
          model: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          id: "password",
          model: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
        {
          id: "confirmPassword",
          model: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm your password",
        },
      ];
    },
  },
  methods: {
    async handleRegister(values) {
      console.log(values);

      try {
        const { data } = await instance.post("/auth/register", values);

        if (data && data.data) {
          toast.success("Register successful!");
          this.$router.push({
            path: "/auth/login",
          });
        } else {
          toast.error("Register failed!");
        }
      } catch (error) {
        console.error("Register error:", error);
        if (error instanceof AxiosError)
          toast.error(error?.response?.data?.message);
      }
    },
  },
};
</script>

<style scoped></style>
