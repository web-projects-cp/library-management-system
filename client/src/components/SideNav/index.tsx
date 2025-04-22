import { NavLink } from 'react-router-dom'
import '../../style.css'

const SideNav = () => {
  return (
    <div className="sideNav-wrapper">
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/admin">Admin-Home </NavLink>
          </li>
          <li>
            <NavLink to="/addbook">Add Book </NavLink>
          </li>
          <li>
            <NavLink to="/addauthor">Add Author </NavLink>
          </li>
          <li></li>
          <li>
            <NavLink to="/viewbooks">View Books </NavLink>
          </li>
          <li>
            <NavLink to="/viewauthors">View Authors </NavLink>
          </li>
          <li>
            <NavLink to="/viewusers">View Users </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideNav
