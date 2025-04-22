import axios from 'axios'
import { useEffect, useState } from 'react'

import { RBAC_RULES } from './roles'

const check = (rules: any, role: any, action: any) => {
  const permissions = rules[role]
  if (!permissions) {
    // role is not present in the rules
    return false
  }

  const staticPermissions = permissions.view
  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true
  }
  const dynamicPermissions = permissions.actions
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions.includes(action)
    if (!permissionCondition) {
      return false
    }

    return true
  }
  return false
}

const Can = ({ perform, yes, no }: any) => {
  const [userRole, setUserRole] = useState('')
  const handleVerifyToken = async () => {
    const token = window.localStorage.getItem('token') || ''
    console.log('token:', token)

    const response = await axios.post(
      'http://localhost:5050/verify-token',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log('response:', response.data)
    setUserRole(response.data.user.role.toLowerCase())
  }

  useEffect(() => {
    handleVerifyToken()
  }, [])

  if (!userRole) return <p>Loading...</p>

  return check(RBAC_RULES, userRole, perform) ? yes() : no()
}

Can.defaultProps = {
  yes: () => null,
  no: () => null,
  perform: '',
}

export default Can
