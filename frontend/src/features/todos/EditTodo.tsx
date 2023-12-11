import { Alert, Button, Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import {
  fetchTodoStart,
  cleanUpTodos,
  deleteTodoStart,
  updateTodoStart,
} from "./todosSlice"
import { useAppSelector } from "../../app/hooks"
import ApiStatus from "../../types/ApiStatus"

const EditTodo = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const todoId = parseInt(id as string, 10) ?? 0
  useEffect(() => {
    if (todoId > 0) {
      dispatch(fetchTodoStart(todoId))
    }
    return () => {
      dispatch(cleanUpTodos())
    }
  }, [])
  const todo = useAppSelector((state) => state.todos.todos[todoId])
  const { fetchTodoApiStatus, updateTodoApiStatus, deleteTodoApiStatus } =
    useAppSelector((state) => state.todos)
  if (todoId <= 0 || fetchTodoApiStatus === ApiStatus.Rejected) {
    return <p>Can't find your item</p>
  }
  if (deleteTodoApiStatus === ApiStatus.Fulfilled) {
    return (
      <>
        <Alert severity="info">Item deleted</Alert>
        <Stack mt={2} direction="row">
          <Button variant="contained" onClick={() => navigate(-1)}>
            go back
          </Button>
        </Stack>
      </>
    )
  }
  return (
    <>
      {fetchTodoApiStatus === ApiStatus.Fulfilled && todo && (
        <>
          <Typography variant="h4">
            Id: {todo.id} Title: {todo.title}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              disabled={
                todo.done ||
                updateTodoApiStatus === ApiStatus.Pending ||
                updateTodoApiStatus === ApiStatus.Fulfilled
              }
              onClick={() => {
                dispatch(updateTodoStart({ ...todo, done: true }))
              }}
            >
              {todo.done ? "Already done" : "Tick it off"}
            </Button>
            <Button
              variant="contained"
              disabled={deleteTodoApiStatus === ApiStatus.Pending}
              onClick={() => {
                dispatch(deleteTodoStart(todoId))
              }}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              go back
            </Button>
          </Stack>
        </>
      )}
    </>
  )
}

export default EditTodo
