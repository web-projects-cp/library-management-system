import { useState, useEffect } from 'react'
import { User } from '../../types'
import SideNav from '../../components/SideNav'

import './ViewUsers.css'

export default function ViewUsers() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  let componentMounted = true
  const tempUser = localStorage.getItem('currentuser')
  const currentUser: any = JSON.parse(tempUser ?? '{"firstname": ""}')

  const getUsers = async () => {
    setLoading(true)
    const response = await fetch('https://cp-library-management.netlify.app/api/v1/users')
    if (componentMounted) {
      setData(await response.json())
      setLoading(false)
    }
    return () => {
      componentMounted = false
    }
  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className="viewusers-form__container">
      {currentUser.isAdmin === true ? (
        <div>
          <SideNav />
          <div className="view-users">
            <table style={{ borderWidth: '1px', borderStyle: 'solid' }}>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              {data.map((user: User) => (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  {user.isAdmin ? (
                    <td style={{ color: 'green' }}>Admin</td>
                  ) : (
                    <td>User</td>
                  )}
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
