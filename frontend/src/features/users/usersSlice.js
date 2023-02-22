import {createSlice} from '@reduxjs/toolkit'


export const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        set_users: (state, action) => {
            state = action.payload
        },
    },
})

export const { set_users } = usersSlice.actions

export const selectUsers = (state) => state.users

export default usersSlice.reducer
