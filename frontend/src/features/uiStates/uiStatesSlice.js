import {createSlice} from '@reduxjs/toolkit'


export const uiStatesSlice = createSlice({
    name: 'uiStates',
    initialState: {
        supervisorUnitsShowing: "modules",
    },
    reducers: {
        changeSupervisorUnitsShowing: (state, action) => {
            state.supervisorUnitsShowing = action.payload
        },
    },
})

export const { changeSupervisorUnitsShowing } = uiStatesSlice.actions

export const selectSupervisorUnitsShowing = (state) => state.uiStates.supervisorUnitsShowing

export default uiStatesSlice.reducer
