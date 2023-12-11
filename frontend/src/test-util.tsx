import { Provider } from "react-redux"
import { getTestStore } from "./app/store"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"

export const renderWithContext = (element: React.ReactElement) => {
  const store = getTestStore()
  const utils = render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>,
  )
  return { store, ...utils }
}
