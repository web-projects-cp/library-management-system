import { useState, useEffect, useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Book } from '../../types'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import '../../style.css'

export default function Books() {
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  let componentMounted = true

  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const [err, setError] = useState(null)
  const [searchMsg, setSearchMsg] = useState('')

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true)
      const response = await axios.get('https://cp-library-management.netlify.app/api/v1/books')
      if (componentMounted) {
        setBooks(response.data)
        setLoading(false)
      }
      return () => {
        componentMounted = false
      }
    }
    getBooks()
  }, [])

  useEffect(() => {
    let errMessage = 'There was a problem loading the data. Refresh the page.'
    if (err) {
      setError(errMessage as any)
    }
    setData(books)
  }, [books, err])

  useEffect(() => {
    books !== undefined && searchBooksResults()
  }, [search])

  const searchBooksResults = useCallback(() => {
    const results = books.filter((book: any) => {
      if (
        book.isbn.includes(search) ||
        book.title.toLowerCase().includes(search)
      ) {
        return true
      }

      const matchingAuthors = book.authors.filter((author: any) => {
        if (author.name.toLowerCase().includes(search)) {
          return true
        }
        return false
      })

      if (matchingAuthors.length !== 0) return true

      const matchingCategory = book.category.filter((cat: any) => {
        if (cat.toLowerCase().includes(search)) {
          return true
        }
        return false
      })

      return matchingCategory.length !== 0
    })

    if (results.length < 1) {
      let resultsMsg = 'No results match this search'
      setSearchMsg(resultsMsg)
    } else {
      setSearchMsg('')
    }
    setData(results)
  }, [books, search])

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    )
  }

  const ShowBooks = () => {
    return (
      <>
        {data.map((product: Book) => {
          return (
            <>
              <div className="book" key={product._id}>
                <div className="image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="book__body">
                  <p style={{ fontWeight: 'bold' }}>{product.title}</p>
                  <p>{product.publisher}</p>

                  {product.authors.length > 1 ? (
                    <p>
                      {product.authors[0].name} and {product.authors.length - 1}{' '}
                      more
                    </p>
                  ) : (
                    <p>{product.authors[0].name}</p>
                  )}

                  {currentUser.firstname === '' ? (
                    ''
                  ) : product.status === 'Available' ? (
                    <p
                      id="status-display"
                      style={{ color: 'green', fontWeight: 'bold' }}
                    >
                      {product.status}
                    </p>
                  ) : (
                    <p
                      id="status-display"
                      style={{ color: 'red', fontWeight: 'bold' }}
                    >
                      {product.status}
                    </p>
                  )}

                  <div className="book__viewbook-btn-container">
                    <NavLink to={`/books/${product._id}`} className="view-book">
                      View
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }

  const handleChange = (e: any) => {
    setSearch(e.target.value)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <>
      <br />
      <h3 className="books__heading">Our Library Books</h3>
      <hr />
      <div className="books">
        <form
          onSubmit={(e) => handleSubmit(e.preventDefault())}
          className="search-form"
          style={{ backgroundColor: 'rgb(53, 113, 3)' }}
        >
          <input
            type="text"
            placeholder="ISBN, title, author, category"
            value={search}
            onChange={handleChange}
          />
        </form>
        <div className="count-display">
          <h6>No. of record(s) found : {Object.keys(data).length}</h6>
        </div>

        <div className="books-container">
          {loading ? <Loading /> : <ShowBooks />}
        </div>
      </div>
    </>
  )
}
