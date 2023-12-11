import { renderWithContext } from "../../test-util"
import AddTodoForm from "./AddTodoForm"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { server } from "../../mocks/server"
import { rest } from "msw"
import { apiUrl } from "../../app/store"

test("Should render UI and confirm todo added after submission", async () => {
  server.use(
    rest.post(`${apiUrl}/todoitems`, async (_, res, ctx) => {
      return res(ctx.status(200))
    }),
  )
  renderWithContext(<AddTodoForm />)

  screen.getByRole("heading", { name: "Add Todo" })
  screen.getByLabelText("Title:")
  const input = screen.getByTestId("title-input")
  const addButton = screen.getByRole("button", { name: "Add Todo" })
  expect(addButton).not.toBeDisabled()
  const ulErrorElement = screen.queryByRole("ul")
  expect(ulErrorElement).not.toBeInTheDocument()

  await userEvent.type(input, "Todo item 1")
  await userEvent.click(addButton)

  await waitFor(() => {
    screen.getByText("Todo item added")
  })
})

test("Should show error after fails to add", async () => {
  server.use(
    rest.post(`${apiUrl}/todoitems`, async (_, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: "Something went wrong" }))
    }),
  )
  renderWithContext(<AddTodoForm />)

  const input = screen.getByTestId("title-input")
  const addButton = screen.getByRole("button", { name: "Add Todo" })
  expect(addButton).not.toBeDisabled()
  const ulErrorElement = screen.queryByRole("ul")
  expect(ulErrorElement).not.toBeInTheDocument()

  await userEvent.type(input, "Todo item 1")
  await userEvent.click(addButton)

  await waitFor(() => {
    screen.getByText("Failed to add todo item")
  })
})
