import {createSlice} from '@reduxjs/toolkit'


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        branches: [],
    },
    reducers: {
        set_users: (state, action) => {
            state.users = action.payload
        },
        set_branches: (state, action) => {
            state.branches = action.payload
        },
    },
})

export const { set_users, set_branches } = usersSlice.actions

export const selectUsers = (state) => state.users.users
export const selectBranches = (state) => state.users.branches

export default usersSlice.reducer
