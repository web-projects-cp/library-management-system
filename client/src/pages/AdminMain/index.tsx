import axios from 'axios'
import { useState, useEffect } from 'react'
import './AdminMain.css'
import { CountResponse } from '../../types'
import { NavLink } from 'react-router-dom'

const AdminMain = () => {
  const [booksTotal, setBooksTotal] = useState<number>()
  const [authorsTotal, setAuthorsTotal] = useState<number>()
  const [usersTotal, setUsersTotal] = useState<number>()
  const [borrowersTotal, setBorrowersTotal] = useState<number>()

  const getDetails = async () => {
    const response1 = await axios.get(
      'https://cp-library-management.netlify.app/api/v1/books/count'
    )
    var countResponse: CountResponse = response1.data
    setBooksTotal(countResponse.count)

    const response2 = await axios.get(
      'https://cp-library-management.netlify.app/api/v1/authors/count'
    )
    countResponse = response2.data
    setAuthorsTotal(countResponse.count)

    const response3 = await axios.get(
      'https://cp-library-management.netlify.app/api/v1/users/count'
    )
    countResponse = response3.data
    setUsersTotal(countResponse.count)

    const response4 = await axios.get(
      'https://cp-library-management.netlify.app/api/v1/books/count-borrowed'
    )
    countResponse = response4.data
    setBorrowersTotal(countResponse.count)

    return () => {}
  }

  useEffect(() => {
    getDetails()
  }, [])

  return (
    <div className="edit-book">
      <div className="edit-book__form">
        <h4>Welcome!! Have a Nice day.</h4>
        <hr />
        <div>
          The library has the following record counts:
          <br />
          <br />
          <ul>
            <li className="details-link">
              <i className="fa fa-book" style={{ color: 'green' }}>
                {' '}
              </i>
              <NavLink to="/viewbooks" className="details-link">
                {' '}
                Total Number of Books : {booksTotal}{' '}
              </NavLink>
            </li>

            <li className="details-link">
              <i
                className="fa fa-pencil-square"
                style={{ color: 'green' }}
                aria-hidden="true"
              ></i>
              <NavLink to="/viewauthors" className="details-link">
                {' '}
                Total Number of Authors : {authorsTotal}{' '}
              </NavLink>
            </li>
            <li>
              <i
                className="fa fa-users"
                style={{ color: 'green' }}
                aria-hidden="true"
              ></i>
              <NavLink to="/viewauthors" className="details-link">
                {' '}
                Total Number of Users : {usersTotal}
              </NavLink>
            </li>
            <li className="details-link1">
              <i
                className="fa fa-check-square-o"
                style={{ color: 'green' }}
                aria-hidden="true"
              ></i>
              Number of Books Issued : {borrowersTotal}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminMain
