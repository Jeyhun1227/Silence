import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    isSuccess: false,
}

export const commentSlice = createSlice({
    name: 'commentsReducer',
    initialState,
    reducers: {
        changeState: (state) => {
            state.isSuccess = !state.isSuccess;
        }
    }
})

export const { changeState } = commentSlice.actions;
export const getSuccessState = (state) => state.commentsReducer.isSuccess;
export default commentSlice.reducer;