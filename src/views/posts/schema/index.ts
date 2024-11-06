import * as yup from "yup";

export const schema = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
    image: yup
      .string()
      .url("Must be a valid URL")
      .required("Image URL is required"),
    categoryId: yup
      .number()
      .typeError("Category ID must be a number")
      .required("Category ID is required")
      .integer("Category ID must be an integer"),
  });