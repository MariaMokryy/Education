import {createSlice} from '@reduxjs/toolkit'
import {USER_LOGGED_IN_KEY, USER_DATA_KEY} from '../_helpers_/constants'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: (localStorage.getItem(USER_LOGGED_IN_KEY)!== null) ? JSON.parse(localStorage.getItem(USER_LOGGED_IN_KEY)) : false,
        currentUser: (localStorage.getItem(USER_DATA_KEY)!== null) ? JSON.parse(localStorage.getItem(USER_DATA_KEY)) : {},
    },
    reducers: {
        loginUser: (state, action) => {
            state.loggedIn = true
            state.currentUser = action.payload
        },

        logoutUser: (state) => {
            state.loggedIn = false
            state.currentUser = {}
        }
    },
})

export const { logoutUser, loginUser} = authSlice.actions

export const selectLoggedIn = (state) => state.auth.loggedIn
export const selectUserData = (state) => state.auth.currentUser

export default authSlice.reducer
