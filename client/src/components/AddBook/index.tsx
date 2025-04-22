import { useState } from 'react'
import axios from 'axios'
import '../../style.css'

import { NavLink } from 'react-router-dom'
const AddBook = () => {
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const [book, setBook] = useState({
    isbn: '',
    title: '',
    image: '',
    description: '',
    author: '',
    publisher: '',
    category: [],
    publishedyear: '',
    status: 'available',
    borrowerId: '',
    borrowDate: '',
    returnDate: '',
  })

  const {
    isbn,
    title,
    image,
    description,
    author,
    publisher,
    category,
    publishedyear,
    status,
    borrowerId,
    borrowDate,
    returnDate,
  } = book

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const newBook = {
      isbn: isbn,
      title: title,
      image: image,
      description: description,
      publisher: publisher,
      authors: [author],
      category: category,
      publishedyear: publishedyear,
      status: status,
      borrowerId: borrowerId,
      borrowDate: borrowDate,
      returnDate: returnDate,
    }

    try {
      const url = 'http://localhost:5000/api/v1/books'
      const res = axios.post(url, newBook)
      var x: any = document.getElementById('saveMsg')
      x.innerHTML = 'Saved Successfully.'
      var y: any = document.getElementById('isbn')
      y.value = ''
      var a: any = document.getElementById('title')
      a.value = ''
      var b: any = document.getElementById('image')
      b.value = ''
      var c: any = document.getElementById('author')
      c.value = ''
      var d: any = document.getElementById('publisher')
      d.value = ''
      var t: any = document.getElementById('publishedyear')
      t.value = ''
      var f: any = document.getElementById('description')
      f.value = ''
      var g: any = document.getElementById('category')
      g.value = ''
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: any) => {
    var x: any = document.getElementById('saveMsg')
    x.innerHTML = ''
    let { name, value } = e.target
    setBook({
      ...book,
      [name]: value,
    })
  }

  return (
    <div className="add-book">
      {currentUser.isAdmin === true ? (
        <form onSubmit={handleSubmit} className="add-book__form">
          <div className="add-book__cancel-wrapper">
            <NavLink to="/viewbooks" className="add-book__delete-link">
              <i className="fa fa-times-circle fa-2x" aria-hidden="true"></i>
            </NavLink>
          </div>
          <h4>Add a new book</h4>
          <div className="add-book__body">
            <div className="add-book__input-topics">
              <label htmlFor="isbn">ISBN :</label>
              <input
                id="isbn"
                type="text"
                name="isbn"
                value={isbn}
                placeholder="isbn"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="add-book__input-topics">
              <label htmlFor="title">Title :</label>
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                placeholder="title"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="add-book__input-topics">
              <label htmlFor="image">Image url :</label>
              <input
                id="image"
                type="text"
                name="image"
                value={image}
                placeholder="image url"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="add-book__input-topics">
              <label htmlFor="author">Author(s) :</label>
              <input
                id="author"
                type="text"
                name="author"
                value={author}
                placeholder="author"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="add-book__input-topics">
              <label htmlFor="publisher">Publisher :</label>
              <input
                id="publisher"
                type="text"
                name="publisher"
                value={publisher}
                placeholder="book publisher"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="add-book__input-topics">
              <label htmlFor="publishedyear">Published Year :</label>
              <input
                id="publishedyear"
                type="text"
                name="publishedyear"
                value={publishedyear}
                placeholder="publishedyear"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="add-book__input-topics">
              <label htmlFor="description">Description :</label>
              <input
                id="description"
                type="text"
                name="description"
                value={description}
                placeholder="description"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="add-book__input-topics">
              <label htmlFor="category">Categoty :</label>
              <input
                id="category"
                type="text"
                name="category"
                value={category}
                placeholder="category"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div id="saveMsg"></div>
          </div>

          <button className="add-book__btn-add">Save</button>
        </form>
      ) : (
        <div className="nonAdmin">
          <p>Sorry, Admin only allowed.</p>
        </div>
      )}
    </div>
  )
}

export default AddBook
