import React, { useState, useEffect } from 'react'
import { Author } from '../../types'
import SideNav from '../../components/SideNav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import '../../style.css'

export default function ViewAuthors() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  let componentMounted = true
  const navigate = useNavigate()
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const getAuthors = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/v1/authors')
    if (componentMounted) {
      setData(await response.json())
      setLoading(false)
    }
    return () => {
      componentMounted = false
    }
  }

  useEffect(() => {
    getAuthors()
  }, [])


  const deleteAuthor = async (id: any, name: string) => {
    if (window.confirm(`Are you sure want to Delete Author ${name} ?`)) {
      await axios.delete('http://localhost:5000/api/v1/authors/' + id)
      getAuthors()
      alert('Successfully Deleted')
    } else {
      console.log('Not')
    }
  }

  const authorDetails = async (id: any, name: string) => {
    localStorage.setItem('authorId', id)
    localStorage.setItem('authorName', name)

    navigate('/authordetails')
  }

  function sortTable(n: number) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0
    table = document.getElementById('myTable') as HTMLTableElement
    switching = true

    dir = 'asc'

    while (switching) {
      switching = false
      rows = table.rows
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false
        x = rows[i].getElementsByTagName('TD')[n]
        y = rows[i + 1].getElementsByTagName('TD')[n]
        if (dir === 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true
            break
          }
        } else if (dir === 'desc') {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true
            break
          }
        }
      }
      if (shouldSwitch) {
        rows[i]?.parentNode?.insertBefore(rows[i + 1], rows[i])
        switching = true
        switchcount++
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc'
          switching = true
        }
      }
    }
  }

  return (
    <div className="viewauthors-form__container">
      {currentUser.isAdmin === true ? (
        <div>
          <SideNav />
          <div className="view-authors">
            <table
              className="viewauthors__table"
              style={{ borderWidth: '1px', borderStyle: 'solid' }}
            >
              <tr>
                <th
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    sortTable(0)
                  }}
                >
                  Author Name
                </th>

                <th>Actions</th>
              </tr>
              {data.map((author: Author, index) => (
                <tr key={index}>
                  <td>{author.name}</td>

                  <td>
                    <button
                      className="viewauthors__btn"
                      onClick={() => authorDetails(author._id, author.name)}
                    >
                      View
                    </button>
                    <button
                      className="viewauthors__btn"
                      onClick={() => deleteAuthor(author._id, author.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      ) : (
        <div className="nonAdmin">
          <p>Sorry, Admin only allowed.</p>
        </div>
      )}
    </div>
  )
}
