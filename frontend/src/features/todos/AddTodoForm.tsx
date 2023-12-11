import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { addTodoSchema } from "./validationSchema"
import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { NewTodo } from "./todoApiService"
import { createTodoStart, cleanUpTodos } from "./todosSlice"
import ApiStatus from "../../types/ApiStatus"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "@hookform/error-message"

const AddTodoForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const createTodoApiStatus = useAppSelector(
    (state) => state.todos.createTodoApiStatus,
  )
  const onSubmit = (data: NewTodo) => {
    dispatch(createTodoStart(data))
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewTodo>({ resolver: yupResolver(addTodoSchema) })

  useEffect(() => {
    return () => {
      dispatch(cleanUpTodos())
    }
  }, [])

  useEffect(() => {
    if (createTodoApiStatus === ApiStatus.Fulfilled) {
      reset()
    }
  }, [createTodoApiStatus])

  return (
    <Box mb={6}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Todo
      </Typography>
      {createTodoApiStatus === ApiStatus.Fulfilled && (
        <Alert severity="success">Todo item added</Alert>
      )}
      {createTodoApiStatus === ApiStatus.Rejected && (
        <Alert severity="error">Failed to add todo item</Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="title-input">Title:</InputLabel>
          <Input
            type="text"
            id="title-input"
            data-testid="title-input"
            placeholder="Please enter title"
            {...register("title")}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                {message}
              </Alert>
            )}
          />
        </FormControl>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            type="submit"
            disabled={createTodoApiStatus === ApiStatus.Pending}
          >
            Add Todo
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            go back
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default AddTodoForm
