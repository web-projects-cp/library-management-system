import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import '../../style.css'
import { FaBars, FaTimes } from 'react-icons/fa'
import axios, { AxiosResponse } from 'axios'

function Navbar() {
  const [icon, setIcon] = useState(false)
  const [data, setData] = useState([])
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `https://cp-library-management.netlify.app/api/v1/users/` + currentUser._id
      )
      currentUser.borrowings = response.data.borrowings
      return () => {}
    }
    getUser()
  }, [])

  const logout = async () => {
    try {
      await axios
        .post(`https://cp-library-management.netlify.app/logout`, {}, { withCredentials: true })
        .then((res: AxiosResponse) => {
          if (res.data === 'done') {
            window.location.href = '/'
          }
        })
    } catch (error: any) {
      console.log(error)
    }
    window.localStorage.clear()
    window.location.reload()
  }

  const handleClick = () => {
    setIcon(!icon)
  }

  const closeDrawer = () => {
    setIcon(false)
  }

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="nav-logo" onClick={closeDrawer}>
          <img className="logo_img" src={logo} alt="logo" />
        </NavLink>
        <div className="menu-icon" onClick={handleClick}>
          {icon ? (
            <FaTimes className="fa-times"></FaTimes>
          ) : (
            <FaBars className="fa-bars"></FaBars>
          )}
        </div>

        <ul className={icon ? 'nav-menu active' : 'nav-menu'}>
          <li>
            <NavLink to="/" className="nav-links" onClick={closeDrawer}>
              Home
            </NavLink>
          </li>

          {currentUser.isAdmin === true ? (
            <li>
              <NavLink
                to="/admin"
                className="nav-links"
                onClick={closeDrawer}
                style={{ display: 'block' }}
              >
                Admin
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/admin"
                className="nav-links"
                onClick={closeDrawer}
                style={{ display: 'none' }}
              >
                Admin
              </NavLink>
            </li>
          )}

          {currentUser.firstname !== '' ? (
            <div className="submenu1">
              <li>
                <NavLink to="/" className="nav-links" onClick={closeDrawer}>
                  {currentUser.firstname}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/cart"
                  id="cart"
                  className="nav-links"
                  onClick={closeDrawer}
                >
                  Cart({currentUser.borrowings.length})
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="nav-links" onClick={logout}>
                  Logout
                </NavLink>
              </li>
            </div>
          ) : (
            <div className="submenu1">
              <li>
                <NavLink
                  to="/register"
                  className="nav-links"
                  onClick={closeDrawer}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="nav-links"
                  onClick={closeDrawer}
                >
                  Login
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
