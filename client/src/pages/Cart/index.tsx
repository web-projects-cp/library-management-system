import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../../style.css'
import axios from 'axios'

const Cart = (props: any) => {
  const [data, setData] = useState([])

  const tempUser = localStorage.getItem('currentuser')

  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const getUserswithBorrowings = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/books/search?userid=${currentUser._id}`
    )
    var countResponse = response.data

    setData(countResponse)
    return () => {}
  }

  useEffect(() => {
    getUserswithBorrowings()
  }, [])

  const returnBook = async (bookId: any) => {
    const singleBook = {
      bookid: bookId,
      userid: currentUser._id,
    }
    try {
      const url = `http://localhost:5000/api/v1/books/return`
      const res = await axios.post(url, singleBook)

      const response = await axios.get(
        `http://localhost:5000/api/v1/users/` + currentUser._id
      )
      currentUser.borrowings = response.data.borrowings
      window.localStorage.setItem('currentuser', JSON.stringify(currentUser))

      var cartHtml: any = document.getElementById('cart')
      cartHtml.innerHTML = `Cart(${currentUser.borrowings.length})`
      getUserswithBorrowings()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="borrowings__container">
      <div className="borrowings__wrapper">
        <div className="borrowings__exit">
          <NavLink to="/" className="borrowings__exit-link">
            Back to Home
          </NavLink>
        </div>
        {currentUser.borrowings.length > 0 ? (
          <div>
            {data.map((book: any) => (
              <div className="borrowings__body">
                <div className="borrowings__image-container">
                  <img src={book.image} alt={book.title} />
                </div>
                <div className="borrowings__content">
                  <h6 style={{ fontWeight: 'bold' }}>{book.title}</h6>
                  Borrow Date:{book.borrowdate.slice(0, 10)}
                  <br />
                  Due on: {book.returndate.slice(0, 10)}
                  <button
                    onClick={() => returnBook(book._id)}
                    className="borrowings__btn-return"
                  >
                    Return Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="borrowings__empty"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h4>No Current Borrowings</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
