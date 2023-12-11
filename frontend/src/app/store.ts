import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import todosReducer from "../features/todos/todosSlice"
import rootSaga from "./rootSaga"
import createSagaMiddleware from "redux-saga"

const reducer = {
  todos: todosReducer,
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

export const getTestStore = (preloadedState?: RootState) => {
  const testSagaMiddleware = createSagaMiddleware()
  const testStore = configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(testSagaMiddleware),
  })
  testSagaMiddleware.run(rootSaga)
  return testStore
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const apiUrl = import.meta.env.VITE_API_URL
sagaMiddleware.run(rootSaga)
