import { useState } from 'react'
import axios from 'axios'
import '../../style.css'
import { NavLink } from 'react-router-dom'

const AddAuthor = () => {
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const [author, setAuthor] = useState({
    name: '',
  })

  const { name } = author

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const newAuthor = {
      name: name,
    }

    try {
      const url = 'http://localhost:5000/api/v1/authors'
      const res = axios.post(url, newAuthor)
      var x: any = document.getElementById('saveMsg')
      x.innerHTML = 'Saved Successfully.'
      var y: any = document.getElementById('name')
      y.value = ''
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: any) => {
    var x: any = document.getElementById('saveMsg')
    x.innerHTML = ''
    let { name, value } = e.target
    setAuthor({
      ...author,
      [name]: value,
    })
  }

  return (
    <div className="add-book">
      {currentUser.isAdmin === true ? (
        <form onSubmit={handleSubmit} className="add-book__form">
          <div className="add-book__cancel-wrapper">
            <NavLink to="/viewauthors" className="add-book__delete-link">
              <i className="fa fa-times-circle fa-2x" aria-hidden="true"></i>
            </NavLink>
          </div>
          <h4>Add a new author</h4>
          <div className="add-book__body">
            <div className="add-book__input-topics">
              <label htmlFor="name">Author Name :</label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                placeholder="Author Name"
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

export default AddAuthor
