import React, { useState, useEffect } from 'react'
import { Book } from '../../types'
import SideNav from '../../components/SideNav'
import { useNavigate } from 'react-router-dom'
import '../../style.css'

import axios from 'axios'

export default function ViewBooks() {
  const navigate = useNavigate()
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  let componentMounted = true

  const getBooks = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/v1/books')
    if (componentMounted) {
      setData(await response.json())
      setLoading(false)
    }
    return () => {
      componentMounted = false
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

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

  const deleteBook = async (id: any, title: string) => {
    if (window.confirm(`Are you sure want to Delete book ${title}?`)) {
      await axios.delete('http://localhost:5000/api/v1/books/' + id)
      getBooks()
      alert('Successfully Deleted')
    } else {
      console.log('Not')
    }
  }

  const updatebook = (data: any) => {
    localStorage.setItem('id', data._id)
    localStorage.setItem('isbn', data.isbn)
    localStorage.setItem('title', data.title)
    localStorage.setItem('image', data.image)
    localStorage.setItem('publisher', data.publisher)
    localStorage.setItem('publishedyear', data.publishedyear)
    localStorage.setItem('description', data.description)
    localStorage.setItem('category', data.category)
    localStorage.setItem('authors', data.authors)
    navigate('/updatebook')
  }

  return (
    <div className="viewbooks-form__container">
      {currentUser.isAdmin === true ? (
        <div>
          <SideNav />

          <div className="view-books">
            <table
              id="myTable"
              style={{ borderWidth: '1px', borderStyle: 'solid' }}
            >
              <tr>
                <th
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    sortTable(0)
                  }}
                >
                  Book
                </th>

                <th
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    sortTable(0)
                  }}
                >
                  ISBN
                </th>
                <th
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    sortTable(1)
                  }}
                >
                  Title
                </th>
                <th
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    sortTable(2)
                  }}
                >
                  Author
                </th>
                <th
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    sortTable(3)
                  }}
                >
                  Publisher
                </th>
                <th
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    sortTable(4)
                  }}
                >
                  Status
                </th>
                <th>Action</th>
              </tr>

              {data.map((book: Book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      height="60px"
                      width="50px"
                      src={book.image}
                      alt={book.title}
                    />
                  </td>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.authors[0].name}</td>
                  <td>{book.publisher}</td>
                  {book.status === 'Available' ? (
                    <td style={{ color: 'green' }}>{book.status}</td>
                  ) : (
                    <td style={{ color: 'red' }}>{book.status}</td>
                  )}

                  <td>
                    <button
                      className="viewbooks__btn"
                      onClick={() => updatebook(book)}
                    >
                      Update
                    </button>
                    <button
                      className="viewbooks__btn"
                      onClick={() => deleteBook(book._id, book.title)}
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
