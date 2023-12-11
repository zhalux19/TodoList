import { Container, Box } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ListingPage from "./pages/ListingPage"
import CreatePage from "./pages/CreatePage"
import { Navigation } from "./components/Navigation"
import EditPage from "./pages/EditPage"

function App() {
  return (
    <Container
      maxWidth="md"
      sx={{
        minWidth: 500, // Set your minimum width here
        padding: 3,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Box component="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todos" element={<ListingPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Container>
  )
}

export default App
