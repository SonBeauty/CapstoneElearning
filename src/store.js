import {configureStore} from "@reduxjs/toolkit"
import coursesSlice from "./modules/Home/slices/coursesSlice";
import authSlice from "./modules/Authentication/slices/authSlice"
const store = configureStore({
    reducer:{
        courses: coursesSlice,
        auth:authSlice
    },
})

export default store