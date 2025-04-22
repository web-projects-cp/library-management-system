import { useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../../style.css'

const UpdateBook = (props: any) => {
  const navigate = useNavigate()
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const [book, setBook] = useState({
    id: localStorage.getItem('id') ?? '',
    isbn: localStorage.getItem('isbn') ?? '',
    title: localStorage.getItem('title') ?? '',
    image: localStorage.getItem('image') ?? '',
    description: localStorage.getItem('description') ?? '',
    publisher: localStorage.getItem('publisher') ?? '',
    category: localStorage.getItem('category') ?? '',
    publishedyear: localStorage.getItem('publishedyear') ?? '',
  })

  const {
    id,
    isbn,
    title,
    image,
    description,
    publisher,
    category,
    publishedyear,
  } = book

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const updatedBook = {
      isbn: isbn,
      title: title,
      image: image,
      description: description,
      publisher: publisher,
      category: category,
      publishedyear: publishedyear,
    }

    try {
      const url = `http://localhost:5000/api/v1/books/${id}`
      const res = await axios.put(url, updatedBook)
    } catch (err) {
      console.log(err)
    }
    navigate('/viewbooks')
  }

  const handleChange = (e: any) => {
    let { name, value } = e.target
    setBook({
      ...book,
      [name]: value,
    })
  }

  if (!book) {
    return <h1>not found</h1>
  }
  return (
    <div className="edit-book">
      {currentUser.isAdmin === true ? (
        <form onSubmit={handleSubmit} className="edit-book__form">
          <div className="edit-book__cancel-wrapper">
            <NavLink to="/viewbooks" className="edit-book__delete-link">
              <i className="fa fa-times-circle fa-2x" aria-hidden="true"></i>
            </NavLink>
          </div>
          <h4>Update book</h4>
          <div className="edit-book__body">
            <div className="edit-book__input-topics">
              <label htmlFor="isbn">ISBN :</label>
              <input
                type="text"
                name="isbn"
                value={isbn}
                placeholder="book isbn"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="edit-book__input-topics">
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="title"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="edit-book__input-topics">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                value={image}
                placeholder="image"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="edit-book__input-topics">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                placeholder="book description"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="edit-book__input-topics">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                name="publisher"
                value={publisher}
                placeholder="book publisher"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="edit-book__input-topics">
              <label htmlFor="author last name">Category</label>
              <input
                type="text"
                name="category"
                value={category}
                placeholder="category"
                required={true}
                onChange={handleChange}
              />
            </div>

            <div className="edit-book__input-topics">
              <label htmlFor="published year">Published Year</label>
              <input
                type="text"
                name="publishedyear"
                value={publishedyear}
                placeholder="published year"
                required={true}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="edit-book__btn-add">Update</button>
        </form>
      ) : (
        <div className="nonAdmin">
          <p>Sorry, Admin only allowed.</p>
        </div>
      )}
    </div>
  )
}

export default UpdateBook
