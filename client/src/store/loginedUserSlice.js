import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  id: 'bla',
  isConnected: false,
  role: 'user',
  courseReg: ''
}

export const LoginedUserSlice = createSlice({
  name: 'loginedUser',
  initialState,
  reducers: {
    loggeduser: (state, action) => {
      state.id = action.payload
    },
    isConnected: (state) => {
      state.isConnected = true
    },
    isNotConnected: (state) => {
      state.isConnected = false
    },
    loginRole: (state, action) => {
      state.role = action.payload
    },
    courseReg: (state, action) => {
      state.courseReg = action.payload
    },
    logout: (state) => {
      state.id = "";
      state.role = "";
      state.isConnected = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { loggeduser, isConnected, isNotConnected, loginRole, courseReg, logout } = LoginedUserSlice.actions

export default LoginedUserSlice.reducer