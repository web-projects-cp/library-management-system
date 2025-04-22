import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import '../../style.css'

const Login = () => {
  const navigate = useNavigate()

  const [token, setToken] = useState('')

  const clientId =
    '470301741700-bcm084q9tn1keuq91q0qgld7nnpu9it0.apps.googleusercontent.com'

  const handleSuccess = async (googleResponse: any) => {
    const tokenId = googleResponse.credential
    console.log('credential:', googleResponse.credential)

    const res = await axios.post(
      'https://cp-library-management.netlify.app/api/v1/google-login',
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    )
    console.log('TOKEN :', res)
    window.localStorage.setItem('token', token)
    window.localStorage.setItem(
      'currentuser',
      JSON.stringify(res.data.user_details)
    )

    setToken(token)
    navigate('/')
    window.location.reload()
  }
  const isLoggedIn = window.localStorage.getItem('token') || ''

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className="login">
      <div className="login__wrapper">
        <h3>Sign In</h3>

        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin onSuccess={handleSuccess} />
        </GoogleOAuthProvider>

        <div className="login__divider">
          <hr className="login__divider-line-before"></hr>
          <p>Or</p>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__input-topics">
            <label htmlFor="username">Username:</label>
            <input type="username" name="username" placeholder="username" />
          </div>

          <div className="login__input-topics">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" placeholder="password" />
          </div>
          <div className="login__btn-save-wrapper">
            <button className="login__btn-login">Sign In</button>
            <NavLink to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </NavLink>
            <p>
              Don't have an account yet?{' '}
              <NavLink to="/register">Sign Up</NavLink> here
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
