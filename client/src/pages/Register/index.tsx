import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'

import { passwordValidator } from '../../validators'

import '../../style.css'

const inputStyleErr = {
  border: '2px solid red',
}
const inputStyle = {
  border: '.6px solid green',
}

const Register = () => {
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  })
  const { firstname, lastname, email, username, password, repeatPassword } =
    newUser

  const [entered, setEntered] = useState({
    firstname: false,
    lastname: false,
    email: false,
    username: false,
    password: false,
    repeatPassword: false,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const newUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
    }

    try {
      const url = 'http://localhost:5000/api/v1/users'
      const res = axios.post(url, newUser)
      var x: any = document.getElementById('saveMsg')
      x.innerHTML = 'Saved Successfully.'
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: any) => {
    let { name, value } = e.target
    setNewUser({
      ...newUser,
      [name]: value,
    })
  }

  const handleBlur = (e: any) => {
    const { name } = e.target
    setEntered({
      ...entered,
      [name]: true,
    })
  }

  const validate = () => {
    const errors = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
    }
    if (entered.firstname && !validator.isAlpha(firstname)) {
      errors.firstname = 'First name should include only letters'
    }
    if (
      entered.firstname &&
      !validator.isLength(firstname, { min: 2, max: 30 })
    ) {
      errors.firstname = 'First name be between 1 and 30 characters'
    }
    if (entered.lastname && !validator.isAlpha(lastname)) {
      errors.lastname = 'Last name should include only letters'
    }
    if (
      entered.lastname &&
      !validator.isLength(lastname, { min: 2, max: 30 })
    ) {
      errors.lastname = 'Last name must be between 1 and 30 characters'
    }
    if (entered.email && !validator.isEmail(email)) {
      errors.email = 'email should be a valid email format'
    }
    if (entered.username && !validator.isAlphanumeric(username)) {
      errors.username = 'username should include only letters and numbers'
    }
    if (
      entered.username &&
      !validator.isLength(username, { min: 6, max: 30 })
    ) {
      errors.username = 'username name be between 6 and 30 characters'
    }
    if (entered.password && !password.match(passwordValidator)) {
      errors.password =
        'Password must be at least 8 characters long, include an uppercase character, a lowercase character, a number and a special character'
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = 'passwords do not match'
    }
    return errors
  }

  const errors = validate()

  return (
    <div className="register-form__container">
      <form onSubmit={handleSubmit} className="register-form">
        <h4 className="register-form__header">Sign Up</h4>
        {/* <p className="verification-err">{errorMsg}</p> */}
        <div className="register-form__input-topics">
          <label htmlFor="firstname">Firstname:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            placeholder="first name"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.firstname && (
          <div>
            <p className="feedback-message">{errors.firstname}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="lastname">Lastname:</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="last name"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.lastname && (
          <div>
            <p className="feedback-message">{errors.lastname}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && (
          <div>
            <p className="feedback-message">{errors.email}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            name="username"
            value={username}
            placeholder="username"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.username && (
          <div>
            <p className="feedback-message">{errors.username}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.password && (
          <div>
            <p className="feedback-message">{errors.password}</p>
          </div>
        )}

        <div className="register-form__input-topics">
          <label htmlFor="repeat password">Repeat password:</label>
          <input
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            placeholder="repeat password"
            required={true}
            onChange={handleChange}
            onBlur={handleBlur}
            style={password !== repeatPassword ? inputStyleErr : inputStyle}
          />
        </div>
        {errors.repeatPassword && (
          <div>
            <p className="feedback-message">{errors.repeatPassword}</p>
          </div>
        )}

        <p>
          Have an account already? <NavLink to="/login">Sign In</NavLink>
        </p>

        <div className="btn-save__wrapper">
          {errors.firstname ||
          errors.lastname ||
          errors.email ||
          errors.username ||
          errors.password ||
          errors.repeatPassword ? (
            <button className="add-book__btn-add--disabled" disabled>
              Submit
            </button>
          ) : (
            <button className="btn-register">Sign Up</button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Register
