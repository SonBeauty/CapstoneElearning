import {configureStore} from "@reduxjs/toolkit"
import CoursesSlice from "./modules/Home/slices/coursesSlice"

const store = configureStore({
    reducer:{
        courses: CoursesSlice
    }
})

export default store