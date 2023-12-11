import { Typography, Grid, Link } from "@mui/material"
import { Todo } from "./todoApiService"

const TodoItem = (todo: Todo) => {
  return (
    <Grid container key={todo.id} alignItems="center" spacing={2} mb={2}>
      <Grid item xs={7}>
        <Typography variant="body1" textAlign="left">
          {todo.id}. {todo.title}
        </Typography>
      </Grid>
      <Grid item xs={3} textAlign="right">
        {todo.done ? "Done" : "Yet to do"}
      </Grid>
      <Grid item xs={2} textAlign="right">
        <Link href={`/edit/${todo.id}`}>Edit</Link>
      </Grid>
    </Grid>
  )
}

export default TodoItem
