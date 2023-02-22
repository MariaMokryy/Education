import {createSlice} from '@reduxjs/toolkit'


export const unitsSlice = createSlice({
    name: 'units',
    initialState: {
        categories: [],
        courses: [],
        modules: [],
    },
    reducers: {
        set_categories: (state, action) => {
            state.categories = action.payload
        },

        set_courses: (state, action) => {
            state.courses = action.payload
        },

        set_modules: (state, action) => {
            state.modules = action.payload
        }
    },
})

export const { set_categories, set_courses, set_modules} = unitsSlice.actions

export const selectCategories = (state) => state.units.categories
export const selectCourses = (state) => state.units.courses
export const selectModules = (state) => state.units.modules


export default unitsSlice.reducer
