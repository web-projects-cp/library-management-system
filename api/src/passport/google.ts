// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'

// dummy way to check if admin.
// you might have a whitelist of admins
const isAdmin = (email: string) => {
  if (email !== 'cpoonkodi@gmail.com') return false
  return true
}

const loginWithGoogle = () => {
  return new GoogleStrategy(
    {
  //   the clientId is optional in this case
       cliendID: process.env.GOOGLE_CLIENT_ID,
     },
    async (
      parsedToken: {
        payload: { 
          given_name: string; 
          family_name:string;
            email: string;
             hd: string 
            }
      },
      googleID: string,
      done: Function
    ) => {
      try {
        let user = await UserService.findOne(parsedToken.payload.email)
        console.log('isUserExists:', !!user)

        if (!user) {
          user = {
            firstname:parsedToken.payload.given_name,
            lastname:parsedToken.payload.family_name,
            username: parsedToken.payload.email,
            email: parsedToken.payload.email,
            isAdmin: isAdmin(parsedToken.payload.hd),
          } as UserDocument

          const newUser = new User(user)
          await UserService.save(newUser)
        }
        // Append user object to req.user
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}

export default loginWithGoogle
