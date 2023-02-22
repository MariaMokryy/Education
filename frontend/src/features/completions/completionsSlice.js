import {createSlice} from '@reduxjs/toolkit'


export const completionsSlice = createSlice({
    name: 'completions',
    initialState: {
        courses_completions: [],
        modules_completions: [],
    },
    reducers: {
        set_courses_completions: (state, action) => {
            state.courses_completions = action.payload
        },

        set_modules_completions: (state, action) => {
            state.modules_completions = action.payload
        },
    },
})

export const { set_courses_completions, set_modules_completions} = completionsSlice.actions

export const selectCoursesCompletions = (state) => state.completions.courses_completions
export const selectModulesCompletions = (state) => state.completions.modules_completions

export default completionsSlice.reducer
