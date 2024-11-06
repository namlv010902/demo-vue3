<template>
  <div class="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">
      {{ id ? "Edit Post 🤪" : "Add New Post 🤪" }}
    </h2>
    <Form @submit="onSubmit" :validation-schema="schema" class="space-y-4">
      <!-- Title Field -->
      <div>
        <label class="block text-gray-700 font-medium mb-2">Title</label>
        <Field
          name="title"
          as="input"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <ErrorMessage name="title" class="text-red-500 text-sm mt-1" />
      </div>

      <!-- Content Field -->
      <div>
        <label class="block text-gray-700 font-medium mb-2">Content</label>
        <Field
          name="content"
          as="textarea"
          rows="4"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <ErrorMessage name="content" class="text-red-500 text-sm mt-1" />
      </div>

      <!-- Image URL Field -->
      <div>
        <label class="block text-gray-700 font-medium mb-2">Image URL</label>
        <Field
          name="image"
          as="input"
          type="url"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <ErrorMessage name="image" class="text-red-500 text-sm mt-1" />
      </div>

      <!-- Category ID Field -->
      <div>
        <label class="block text-gray-700 font-medium mb-2">Category ID</label>
        <Field
          name="categoryId"
          as="input"
          type="number"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <ErrorMessage name="categoryId" class="text-red-500 text-sm mt-1" />
      </div>
      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Submit
      </button>
      
    </Form>
  </div>
</template>

<script setup lang="ts">

import { APIQueryKey } from "@/libs/utils/api/vue-query";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { toast } from "vue3-toastify";
import { schema } from "../schema";
import { AxiosError, type AxiosRequestConfig } from "axios";
import { createApi, updateApi } from "@/libs/utils/api/api";
import { watchEffect } from "vue";

const props = defineProps<{
  id?: number;
  refetch:()=>void
}>();

// Define validation schema

// Bind schema to the form
const { handleSubmit, setValues,resetForm } = useForm({
  validationSchema: schema,
});
console.log(props.id);

// Handle submit
const onSubmit = (values: any) => {
  mutate(values);
  console.log("Form data:", values);
};

// Fetch category options
const { status, data, error, isFetching } = useQuery({
  queryKey: [APIQueryKey.OPTION_CATEGORIES],
});

const mutationFn =(data:any)=>{
  const config:AxiosRequestConfig<any>={
    data
  }
  if(props.id && postData){
    return updateApi({
      urlKey:'POSTS',
      id:props.id,
      config
    })
  }else{
    return createApi({
      urlKey:'POSTS',
      config
    })
  }
}
// Mutation to create a post
const { isLoading, isError, isSuccess, mutate } = useMutation({
  mutationFn,
  onSuccess: (res) => {
  if(res)  toast.success(res.data?.message);
  props.refetch()
  },
  onError: (res) => {
 if(res instanceof AxiosError) toast.error(res.response?.data?.message);
  },
});

const {
  isError: postIsError,
  isSuccess: postIsSuccess,
  data: postData,
} = useQuery({
  queryKey: [APIQueryKey.POSTS + `/${props.id}`],
  enabled: !!props.id,
});

watchEffect(() => {
    console.log("Post Data:", postData);
    const newValues = {
      title: postData?.data?.title || '123',
      content: postData?.data?.content || '',
      image: postData?.data?.image || '',
      categoryId: postData?.data?.categoryId || null,
    };

    console.log("Setting form values:", newValues);
    setValues(newValues);
  
});
</script>

<style scoped></style>
