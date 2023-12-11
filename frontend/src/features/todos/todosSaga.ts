import { takeLatest, call, put } from "redux-saga/effects"
import {
  updateTodoStart,
  updateTodoFailure,
  updateTodoSuccess,
  createTodoStart,
  createTodoFailure,
  createTodoSuccess,
  deleteTodoStart,
  deleteTodoSuccess,
  deleteTodoFailure,
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  fetchTodoStart,
  fetchTodoSuccess,
  fetchTodoFailure,
} from "./todosSlice"
import {
  type Todo,
  type NewTodo,
  updateTodo,
  addTodo,
  deleteTodo,
  fetchTodos,
  fetchTodo,
} from "./todoApiService"
import { PayloadAction } from "@reduxjs/toolkit"
import { PaginationRequest, PaginationResponse } from "../../types/Pagination"

// Worker saga for updating a todo
function* updateTodoWorker(action: PayloadAction<Todo>) {
  try {
    yield call(updateTodo, action.payload)
    yield put(updateTodoSuccess(action.payload))
  } catch (error) {
    yield put(updateTodoFailure())
  }
}

// Watch saga for updateTodo action
export function* watchUpdateTodo() {
  yield takeLatest(updateTodoStart.type, updateTodoWorker)
}

// Worker saga for adding a new todo
function* createTodoWorker(action: PayloadAction<NewTodo>) {
  try {
    const id: number = yield call(addTodo, action.payload)
    const newTodo = { ...action.payload, id, done: false }
    yield put(createTodoSuccess(newTodo))
  } catch (error) {
    yield put(createTodoFailure())
  }
}

// Watch saga for addTodo action
export function* watchCreateTodo() {
  yield takeLatest(createTodoStart.type, createTodoWorker)
}

// Worker saga for deleting a todo
function* deleteTodoWorker(action: PayloadAction<number>) {
  try {
    yield call(deleteTodo, action.payload)
    yield put(deleteTodoSuccess(action.payload))
  } catch (error) {
    yield put(deleteTodoFailure())
  }
}

// Watch saga for deleteTodo action
export function* watchDeleteTodo() {
  yield takeLatest(deleteTodoStart.type, deleteTodoWorker)
}

// Worker saga for fetching todos
function* fetchTodosWorker(action: PayloadAction<PaginationRequest>) {
  try {
    const todos: PaginationResponse<Todo> = yield call(
      fetchTodos,
      action.payload,
    )
    yield put(fetchTodosSuccess(todos))
  } catch (error) {
    yield put(fetchTodosFailure())
  }
}

// Watch saga for fetchTodos action
export function* watchFetchTodos() {
  yield takeLatest(fetchTodosStart.type, fetchTodosWorker)
}

// Worker saga for fetching a single todo
function* fetchTodoWorker(action: PayloadAction<number>) {
  try {
    const todo: Todo = yield call(fetchTodo, action.payload)
    yield put(fetchTodoSuccess(todo))
  } catch (error) {
    yield put(fetchTodoFailure())
  }
}

// Watch saga for fetchSingleTodo action
export function* watchFetchTodo() {
  yield takeLatest(fetchTodoStart.type, fetchTodoWorker)
}
