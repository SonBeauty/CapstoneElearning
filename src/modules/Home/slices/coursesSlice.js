import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import courseAPI from "apis/courseAPI"

const initialState = {
    courses: [],
    isLoading: false,
    error: ""
}

export const getCourses = createAsyncThunk("home/courses/getCourses",
    async (_, { rejecWithValue }) => {
        try {
            const { data } = await courseAPI.getCourses()
            return data
        } catch (error) {
            rejecWithValue(error.response.data)
        }
    })

const coursesSlice = createSlice({
    name: "home/courses",
    initialState, reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourses.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCourses.fulfilled, (state, {payload}) => {
            state.courses = payload
            state.isLoading = false;
        })
        builder.addCase(getCourses.rejected, (state,{payload}) => {
            state.error = payload
            state.isLoading = false;
        })

    }
})
export default coursesSlice.reducer