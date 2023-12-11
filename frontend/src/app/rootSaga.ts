import { all, call, spawn } from "redux-saga/effects"
import {
  watchUpdateTodo,
  watchCreateTodo,
  watchDeleteTodo,
  watchFetchTodos,
  watchFetchTodo,
} from "../features/todos/todosSaga"

export default function* rootSaga() {
  const sagas = [
    watchUpdateTodo,
    watchCreateTodo,
    watchDeleteTodo,
    watchFetchTodos,
    watchFetchTodo,
  ]

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          yield call(saga)
          break
        }
      }),
    ),
  )
}
