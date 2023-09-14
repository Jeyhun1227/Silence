import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import commentReducer from "./slices/commentSlice";

const makeStore = () =>
    configureStore({
        reducer: {
            commentsReducer: commentReducer,
        },
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);