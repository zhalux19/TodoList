import { useEffect } from "react"
import TodoItem from "./TodoItem"
import {
  Alert,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { cleanUpTodos, fetchTodosStart } from "./todosSlice"
import ApiStatus from "../../types/ApiStatus"

const pageSize = 5

const TodoList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentParams = Object.fromEntries([...searchParams])
  const pageNumberStr = currentParams["pageNumber"] || "1"
  const pageNumber = parseInt(pageNumberStr) || 1
  const dispatch = useDispatch()
  const fetchTodosApiStatus = useAppSelector(
    (state) => state.todos.fetchTodosApiStatus,
  )

  useEffect(() => {
    dispatch(fetchTodosStart({ pageNumber, pageSize }))
    return () => {
      dispatch(cleanUpTodos())
    }
  }, [])

  const todoIds = useAppSelector(
    (state) => state.todos.pagination.pageItems[pageNumber],
  )
  const { pageNumber: page, totalPages: count } = useAppSelector(
    (state) => state.todos.pagination,
  )

  const { todos } = useAppSelector((state) => state.todos)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchTodosStart({ pageNumber: value, pageSize }))
    searchParams.set("pageNumber", value.toString())
    setSearchParams(searchParams)
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo list
      </Typography>
      {fetchTodosApiStatus === ApiStatus.Pending && (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
      {fetchTodosApiStatus === ApiStatus.Rejected && (
        <Alert severity="error">Failed to fetch todos</Alert>
      )}
      {fetchTodosApiStatus === ApiStatus.Fulfilled &&
        todoIds &&
        (todoIds.length > 0 ? (
          <>
            {todoIds.map((id) => (
              <TodoItem key={id} {...todos[id]} />
            ))}
          </>
        ) : (
          <Typography mb={2}>This page is currently empty.</Typography>
        ))}
      <Pagination count={count} page={page} onChange={handleChange} />
    </>
  )
}

export default TodoList
