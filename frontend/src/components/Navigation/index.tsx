import { NavLink } from "react-router-dom"
import { StyledLi, StyledNav, StyledUl } from "./StyledNavigation"

export const Navigation = () => {
  return (
    <StyledNav>
      <StyledUl>
        <StyledLi>
          <NavLink to="/">Home</NavLink>
        </StyledLi>
        <StyledLi>
          <NavLink to="/todos?pageNumber=1">Todos</NavLink>
        </StyledLi>
        <StyledLi>
          <NavLink to="/create">Create</NavLink>
        </StyledLi>
      </StyledUl>
    </StyledNav>
  )
}
