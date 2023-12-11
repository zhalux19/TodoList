import ApiStatus from "../../types/ApiStatus"
import { Todo } from "./todoApiService"
import todosReducer, {
  fetchTodoFailure,
  fetchTodoStart,
  fetchTodoSuccess,
  initialState,
} from "./todosSlice"

const todo: Todo = {
  id: 1,
  title: "Item 1",
  done: true,
}

//This is to showcase my approach to test slice using fetch todo as an example.
//Test coverage can be boosted to cover createTodo, updateTodo, fetchTodos using the same approach if needed
describe("reducer should handle fetch todo related actions and update state as expected", () => {
  it("should return the initial state when passed an empty action", () => {
    const action = { type: "" }
    const result = todosReducer(initialState, action)
    expect(result).toEqual(initialState)
  })
  it("should update fetchTodoApiStatus to pending when fetchTodoStart is dispatched", () => {
    const action = fetchTodoStart(1)
    const result = todosReducer(initialState, action)
    expect(result.fetchTodoApiStatus).toEqual(ApiStatus.Pending)
  })
  it("should update fetchTodoApiStatus to success and add todo to tods when fetchTodoStart is dispatched", () => {
    const action = fetchTodoSuccess(todo)
    const result = todosReducer(initialState, action)
    expect(result.fetchTodoApiStatus).toEqual(ApiStatus.Fulfilled)
    expect(result.todos).toEqual({ 1: todo })
  })
  it("should update fetchTodoApiStatus to rejected when fetchTodoFailure is dispatched", () => {
    const action = fetchTodoFailure()
    const result = todosReducer(initialState, action)
    expect(result.fetchTodoApiStatus).toEqual(ApiStatus.Rejected)
  })
})
