import { rest } from "msw"
const TODO_KEY = "todos"

const lightlyPersist = (key: string, payload: any) => {
  sessionStorage.setItem(key, JSON.stringify(payload))
}

const readFromStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) || "{}")
}

export const handlers = [
  rest.get("/api/todoitems", async (req, res, ctx) => {
    const url = new URL(req.url)
    const pageNumber = Number(url.searchParams.get("pageNumber"))
    const pageSize = Number(url.searchParams.get("pageSize"))

    if (
      !pageNumber ||
      !pageSize ||
      isNaN(Number(pageNumber)) ||
      isNaN(Number(pageSize))
    ) {
      return res(
        ctx.delay(),
        ctx.status(401),
        ctx.json({ message: "bad request" }),
      )
    }
    const existingTodos = Object.values(readFromStorage(TODO_KEY))
    const total = existingTodos.length
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = (pageNumber - 1) * pageSize + pageSize
    const todos = existingTodos.slice(startIndex, endIndex)
    const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0
    const result = {
      items: todos,
      pageNumber,
      totalPages,
    }
    return res(ctx.status(200), ctx.json(result))
  }),
  rest.post("/api/todoitems", async (req, res, ctx) => {
    const request = await req.json()
    const existingTodos = readFromStorage(TODO_KEY)
    const maxId = Object.keys(existingTodos).reduce(
      (max, id) => Math.max(max, parseInt(id)),
      0,
    )
    const id = maxId + 1
    const todo = { ...request, id, done: false }
    const todos = { ...existingTodos, [id]: todo }
    lightlyPersist(TODO_KEY, todos)
    return res(ctx.status(200))
  }),
  rest.delete("/api/todoitems/:id", async (req, res, ctx) => {
    const id = req.params.id as unknown as number
    const todos = readFromStorage(TODO_KEY)
    if (todos[id]) {
      delete todos[id]
      lightlyPersist(TODO_KEY, todos)
      return res(ctx.status(200))
    } else {
      return res(
        ctx.delay(),
        ctx.status(404),
        ctx.json({ message: "todo not found" }),
      )
    }
  }),
  rest.put("/api/todoitems/:id", async (req, res, ctx) => {
    const id = req.params.id as unknown as number
    const updatedTodo = await req.json()
    const todos = readFromStorage(TODO_KEY)

    if (todos[id]) {
      const todo = { ...todos[id], ...updatedTodo }
      todos[id] = todo
      lightlyPersist(TODO_KEY, todos)
      return res(ctx.status(200), ctx.json(todo))
    } else {
      return res(
        ctx.delay(),
        ctx.status(404),
        ctx.json({ message: "todo not found" }),
      )
    }
  }),
  rest.get("/api/todoitems/:id", async (req, res, ctx) => {
    const id = req.params.id as unknown as number
    const todos = readFromStorage(TODO_KEY)
    if (todos[id]) {
      return res(ctx.status(200), ctx.json(todos[id]))
    } else {
      return res(
        ctx.delay(),
        ctx.status(404),
        ctx.json({ message: "todo not found" }),
      )
    }
  }),
]
