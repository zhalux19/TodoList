import * as yup from "yup"

export const addTodoSchema = yup.object({
  title: yup
    .string()
    .required("Title cannot be empty")
    .max(200, "Title cannot be more than 200 characters")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Title can only contain letters, numbers, and spaces",
    ),
})
