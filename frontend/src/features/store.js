import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./auth/authSlice";
import unitsReducer from "./educationUnits/unitsSlice";
import usersReducer from "./users/usersSlice";
import completionsReducer from "./completions/completionsSlice"
import uiStatesReducer from './uiStates/uiStatesSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        units: unitsReducer,
        users: usersReducer,
        completions: completionsReducer,
        uiStates: uiStatesReducer,
    }
})