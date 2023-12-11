import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import ApiStatus from "../../types/ApiStatus"
import {
  PaginationRequest,
  PaginationResponse,
  PaginationState,
} from "../../types/Pagination"
import { type NewTodo, type Todo } from "./todoApiService"

export type TodoState = {
  todos: Record<number, Todo>
  pagination: PaginationState<number>
  fetchTodoApiStatus: ApiStatus
  fetchTodosApiStatus: ApiStatus
  updateTodoApiStatus: ApiStatus
  deleteTodoApiStatus: ApiStatus
  createTodoApiStatus: ApiStatus
}

const defaultPagination: PaginationState<number> = {
  pageNumber: 1,
  totalPages: 0,
  pageItems: {},
}

export const initialState: TodoState = {
  todos: {},
  pagination: defaultPagination,
  fetchTodoApiStatus: ApiStatus.Idle,
  fetchTodosApiStatus: ApiStatus.Idle,
  updateTodoApiStatus: ApiStatus.Idle,
  deleteTodoApiStatus: ApiStatus.Idle,
  createTodoApiStatus: ApiStatus.Idle,
}

const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodoStart(state, action: PayloadAction<number>) {
      state.fetchTodoApiStatus = ApiStatus.Pending
    },
    fetchTodoSuccess(state, action: PayloadAction<Todo>) {
      const { id } = action.payload
      state.todos[id] = action.payload
      state.fetchTodoApiStatus = ApiStatus.Fulfilled
    },
    fetchTodoFailure(state) {
      state.fetchTodoApiStatus = ApiStatus.Rejected
    },
    fetchTodosStart(state, action: PayloadAction<PaginationRequest>) {
      state.fetchTodosApiStatus = ApiStatus.Pending
    },
    fetchTodosSuccess(state, action: PayloadAction<PaginationResponse<Todo>>) {
      const { items, pageNumber, totalPages } = action.payload
      const newTodos = items.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: { ...curr } }),
        {},
      )
      state.todos = { ...state.todos, ...newTodos }
      state.pagination = {
        totalPages,
        pageNumber,
        pageItems: {
          ...state.pagination.pageItems,
          [pageNumber]: Object.keys(newTodos)
            .map(Number)
            .filter((key) => !isNaN(key)),
        },
      }
      state.fetchTodosApiStatus = ApiStatus.Fulfilled
    },
    fetchTodosFailure(state) {
      state.fetchTodosApiStatus = ApiStatus.Rejected
    },
    createTodoStart(state, action: PayloadAction<NewTodo>) {
      state.createTodoApiStatus = ApiStatus.Pending
    },
    createTodoSuccess(state, action: PayloadAction<Todo>) {
      state.todos = { ...state, [action.payload.id]: action.payload }
      state.createTodoApiStatus = ApiStatus.Fulfilled
    },
    createTodoFailure(state) {
      state.createTodoApiStatus = ApiStatus.Rejected
    },
    deleteTodoStart(state, action: PayloadAction<number>) {
      state.deleteTodoApiStatus = ApiStatus.Pending
    },
    deleteTodoSuccess(state, action: PayloadAction<number>) {
      delete state.todos[action.payload]
      state.deleteTodoApiStatus = ApiStatus.Fulfilled
    },
    deleteTodoFailure(state) {
      state.deleteTodoApiStatus = ApiStatus.Rejected
    },
    updateTodoStart(state, action: PayloadAction<Todo>) {
      state.updateTodoApiStatus = ApiStatus.Pending
    },
    updateTodoSuccess(state, action: PayloadAction<Todo>) {
      state.todos[action.payload.id] = action.payload
      state.updateTodoApiStatus = ApiStatus.Fulfilled
    },
    updateTodoFailure(state) {
      state.updateTodoApiStatus = ApiStatus.Rejected
    },
    cleanUpTodos(state) {
      state.createTodoApiStatus = ApiStatus.Idle
      state.deleteTodoApiStatus = ApiStatus.Idle
      state.fetchTodosApiStatus = ApiStatus.Idle
      state.updateTodoApiStatus = ApiStatus.Idle
      state.fetchTodoApiStatus = ApiStatus.Idle
      state.pagination = defaultPagination
    },
  },
})

export const {
  fetchTodoStart,
  fetchTodoSuccess,
  fetchTodoFailure,
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  createTodoStart,
  createTodoSuccess,
  createTodoFailure,
  deleteTodoStart,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateTodoStart,
  updateTodoSuccess,
  updateTodoFailure,
  cleanUpTodos,
} = todosSlice.actions

export default todosSlice.reducer
