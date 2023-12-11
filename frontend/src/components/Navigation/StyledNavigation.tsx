import { styled } from "@mui/system"

export const StyledNav = styled("nav")({
  padding: "1rem 0",
  border: "none",
})

export const StyledUl = styled("ul")({
  listStyle: "none",
  display: "flex",
  justifyContent: "center",
  padding: 0,
})

export const StyledLi = styled("li")({
  margin: "0 1rem",
  "& a.active": {
    color: "rgb(25, 118, 210, 0.8)",
  },
})
