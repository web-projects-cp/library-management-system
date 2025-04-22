import axios from 'axios'
import { useState, useEffect } from 'react'

import '../../style.css'
import { Book } from '../../types'
import { NavLink } from 'react-router-dom'

const AuthorDetails = () => {
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')
  const authorName = localStorage.getItem('authorName') ?? ''
  const [data, setData] = useState([])

  const getauthorDetails = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/books/search?authors=${authorName}`
    )
    setData(response.data)

    return () => {}
  }

  useEffect(() => {
    getauthorDetails()
  }, [])

  return (
    <div className="author-details">
      {currentUser.isAdmin === true ? (
        <div className="author-details__form">
          <div className="author-details__cancel-wrapper">
            <NavLink to="/viewauthors" className="author-details__delete-link">
              <i className="fa fa-times-circle fa-2x" aria-hidden="true"></i>
            </NavLink>
          </div>
          <h4 style={{ textTransform: 'uppercase' }}>{authorName}</h4>
          <hr />
          <p style={{ alignItems: 'flex-start', width: '350px' }}>
            Books Written:{' '}
          </p>

          {data.map((product: Book) => (
            <div>
              <ul>
                <li style={{ display: 'flex' }}>
                  <img
                    height="60px"
                    width="50px"
                    src={product.image}
                    alt={product.title}
                  />
                  <li
                    style={{
                      alignItems: 'flex-start',
                      width: '350px',
                      fontSize: '13px',
                    }}
                  >
                    {product.title}
                  </li>
                </li>
              </ul>
              <div></div>
            </div>
          ))}
          <div></div>
        </div>
      ) : (
        <div className="nonAdmin">
          <p>Sorry, Admin only allowed.</p>
        </div>
      )}
    </div>
  )
}

export default AuthorDetails
