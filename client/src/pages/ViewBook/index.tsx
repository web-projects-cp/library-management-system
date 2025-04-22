import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'

import './ViewBook.css'

const ViewBook = () => {
  const [book, setBook] = useState()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const tempUser = localStorage.getItem('currentuser')

  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  useEffect(() => {
    const getBook = async () => {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:5000/api/v1/books/${id}`
      )
      setBook(response.data)
      setLoading(false)
    }
    getBook()
  }, [])

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    )
  }

  const addBookToBorrowings = async (id: any) => {
    const borrowingBook = {
      borrowings: id,
    }
    try {
      const url = `http://localhost:5000/api/v1/users/${currentUser._id}`
      const res = await axios.put(url, borrowingBook)
    } catch (err) {
      console.log(err)
    }
  }

  const handleBorrow = async (e: any) => {
    e.preventDefault()
    const singleBook = {
      bookid: id,
      userid: currentUser._id,
    }
    try {
      const url = `http://localhost:5000/api/v1/books/borrow`
      const res = await axios.post(url, singleBook)
      var x: any = document.getElementById('status')
      x.innerHTML = 'Borrowed'
      var y: any = document.getElementById('borrow_btn')
      y.style.display = 'none'
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/` + currentUser._id
      )
      currentUser.borrowings = response.data.borrowings
      window.localStorage.setItem('currentuser', JSON.stringify(currentUser))

      var cartHtml: any = document.getElementById('cart')
      cartHtml.innerHTML = `Cart(${currentUser.borrowings.length})`

      // addBookToBorrowings(id);
    } catch (err) {
      console.log(err)
    }
  }

  const ShowBook = () => {
    const tempAuthors = [{ name: 'NA' }]

    const singleBook = book ?? {
      publishedyear: '',
      image: 'NA',
      title: 'NA',
      publisher: 'NA',
      description: 'NA',
      isbn: '',
      status: '',
      category: [],
      authors: tempAuthors,
    }

    return (
      <>
        <div className="view-book__container">
          <div className="book-details">
            <div className="book-details__exit">
              <NavLink to="/">Back to Home</NavLink>
            </div>
            <div className="book-details__book-wrapper">
              <div className="book-details__book-left">
                <h4 className="book-details__title">{singleBook.title}</h4>
                <div className="book-details__image-container">
                  <img src={singleBook.image} alt={singleBook.title} />
                </div>
                <div className="book-details__authors-conatiner">
                  {singleBook.authors.map((name) => (
                    <p className="book-details__author">{name.name}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="book-details__book-right">
              <p>
                <span>ISBN : </span> {singleBook.isbn}
              </p>
              <p>
                <span>Publisher : </span> {singleBook.publisher}
              </p>
              <p>
                <span>Publisher : </span> {singleBook.publishedyear}
              </p>
              <p>
                <span>Description : </span> {singleBook.description}
              </p>

              <ul className="book-details__category">
                <span>Category : </span>

                <li className="book-details__categories">
                  {singleBook.category.map((name) => (
                    <p className="book-details__categories">{name}</p>
                  ))}
                </li>
              </ul>

              {currentUser.firstname === '' ? (
                ''
              ) : (
                <div>
                  <div className="book-details__status">
                    {singleBook.status === 'Available' ? (
                      <p id="status">
                        {' '}
                        Status:{' '}
                        <span
                          style={{ color: 'green', textTransform: 'uppercase' }}
                        >
                          {singleBook.status}
                        </span>
                      </p>
                    ) : (
                      <p id="status">
                        {' '}
                        Status:{' '}
                        <span
                          style={{ color: 'red', textTransform: 'uppercase' }}
                        >
                          {singleBook.status}
                        </span>
                      </p>
                    )}
                  </div>

                  {singleBook.status === 'Available' ? (
                    <div className="book-details__borrow-book-wrapper">
                      <button
                        id="borrow_btn"
                        onClick={handleBorrow}
                        className="book-details__borrow-book-btn"
                      >
                        Borrow
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return <div>{loading ? <Loading /> : <ShowBook />}</div>
}
export default ViewBook
