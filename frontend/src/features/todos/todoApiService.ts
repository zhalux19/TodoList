import axios from "axios"
import { PaginationRequest, PaginationResponse } from "../../types/Pagination"
import { apiUrl } from "../../app/store"

export type Todo = {
  id: number
  title: string
  done: boolean
}

export type NewTodo = Omit<Todo, "id" | "done">

export const fetchTodos = async ({
  pageNumber,
  pageSize,
}: PaginationRequest): Promise<PaginationResponse<Todo>> => {
  try {
    const { data } = await axios.get(
      `${apiUrl}/todoitems?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    )
    return data
  } catch (e) {
    throw e
  }
}

export const fetchTodo = async (id: number): Promise<Todo> => {
  try {
    const { data } = await axios.get(`${apiUrl}/todoitems/${id}`)
    return data
  } catch (e) {
    throw e
  }
}

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/todoitems/${id}`)
  } catch (e) {
    throw e
  }
}

export const updateTodo = async (todo: Todo): Promise<void> => {
  try {
    await axios.put(`${apiUrl}/todoitems/${todo.id}`, todo)
  } catch (e) {
    throw e
  }
}

export const addTodo = async (newTodo: NewTodo): Promise<number> => {
  try {
    const { data } = await axios.post(`${apiUrl}/todoitems`, newTodo)
    return data
  } catch (e) {
    throw e
  }
}
