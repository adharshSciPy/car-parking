import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.js'

import LoginedUserRecducer from './loginedUserSlice.js'


export default configureStore({
   reducer: {
      auth: authReducer,  
      loginedUser: LoginedUserRecducer
   }
})